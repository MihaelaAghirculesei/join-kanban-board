import { NgClass, CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, ViewChild, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, FormsModule, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { FeedbackServiceService } from '../../services/feedback.service';
import { Contact } from '../../interfaces/contact';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { OverlayService } from '../../services/overlay.service';
import { OverlayComponent } from '../contact/overlay/overlay.component';
import { InputdateService } from '../../services/inputdate.service';
import { LoginComponent } from "../../landingpage/login/login.component";
import { SignupComponent } from '../../landingpage/signup/signup.component';

/**
 * Component for adding and editing tasks.
 * Handles task creation, form validation, subtasks, contact assignment, and date formatting.
 */
@Component({
  selector: 'app-add-task',
  imports: [NgClass, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  /**
   * Constructor that initializes an effect to reset the form when overlay closes.
   */
  constructor() {
    let initialized = false;
    effect(
      () => {
        const isOpen = this.overlayService.isOpen();
        if (!initialized) {
          initialized = true;
          return;
        }
        if (!isOpen) {
          this.resetForm();
        }
      },
      { allowSignalWrites: true }
    );
    
  }

  /** Service for managing contacts */
  contactService = inject(ContactService);
  
  /** Service for displaying feedback messages to users */
  feedbackService = inject(FeedbackServiceService);
  
  /** Service for managing overlay components */
  overlayService = inject(OverlayService);
  
  /** Service for managing tasks */
  taskService = inject(TaskService);
  
  /** Service for date input handling and formatting */
  inputDateService = inject(InputdateService);
  
  /** Router for navigation */
  router = inject(Router);

  /** Reference to the task title input field */
  @ViewChild('taskTitle') taskTitle: NgModel | undefined;
  
  /** Reference to the task date input field */
  @ViewChild('taskDate') taskDate: NgModel | undefined;
  
  /** Reference to the category input field */
  @ViewChild('categoryField') categoryField: NgModel | undefined;
  
  /** Reference to the overlay element */
  @ViewChild('overlayRef', { static: false }) overlayRef!: ElementRef;
  
  /** Reference to the hidden date input for native date picker */
  @ViewChild('hiddenDateInput') hiddenDateInput!: ElementRef;
  
  /** Formatted date string for display */
  displayDate: string = '';
  
  /** Search term for filtering contacts */
  searchTerm: string = '';
  
  /** Controls visibility of action icons for subtasks */
  showActionIcons: boolean = false;

  /** Object for new subtask input */
  newSubtask: { title: string; isDone: boolean } = {
    title: '',
    isDone: false,
  };

  /** Object for editing existing subtasks */
  editableSubtask: { title: string; isDone: boolean } = {
    title: '',
    isDone: false,
  };

  /** Index of subtask being edited, null if not editing */
  editedIndex: number | null = null;
  
  /** Controls visibility of the dropdown menu */
  dropdownOpen: boolean = false;
  
  /** Controls visibility of the select dropdown */
  isSelectOpen: boolean = false;

  /** Task being edited */
  editableTask: any;
  
  /**
   * Initializes component data when component is created.
   * Sets up task data from taskService if editing an existing task.
   */
  ngOnInit() {
    const taskToEdit = this.taskService.currentEditedTask();
    if (taskToEdit) {
      this.taskService.taskData = structuredClone(taskToEdit);
    }    
    const isoDate = this.taskService.taskData.date;
    if (isoDate) {
      const { day, month, year } = this.inputDateService.parseISOToParts(isoDate);
      this.displayDate = this.inputDateService.formatDateDisplay(day, month, year);
    }
  }
  
  /**
   * Shows action icons when there is content in the subtask input field.
   */
  onInputChangeSubtask() {
    this.showActionIcons = this.newSubtask.title.trim().length > 0;
  }
   
  /**
   * Toggles the select dropdown open state.
   */
  toggleSelectOpen() {
    this.isSelectOpen = !this.isSelectOpen;
  }

  /**
   * Toggles the dropdown menu open state.
   */
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  /**
   * Closes dropdown when clicking outside of it.
   * @param event - Mouse click event
   */
  @HostListener('document:click', ['$event'])
  handleBackdropClick(event: MouseEvent) {
    if (!this.overlayRef?.nativeElement) return;

    const clickedInside = this.overlayRef.nativeElement.contains(event.target);
    if (!clickedInside && this.dropdownOpen) {
      this.toggleDropdown();
    }
  }

  /**
   * Sets the priority of the task.
   * @param priority - Priority level to set ('Urgent', 'Medium', or 'Low')
   */
  setPrority(priority: 'Urgent' | 'Medium' | 'Low') {
    this.taskService.taskData.priority = priority;
    this.setClickedButton(priority);
  }

  /**
   * Updates the UI to reflect which priority button is clicked.
   * @param button - Button identifier
   */
  setClickedButton(button: string) {
    this.taskService.clickedButton.set(button);
  }

  /**
   * Toggles selection of a contact for task assignment.
   * @param item - Contact to toggle selection
   */
  toggleContactSelection(item: Contact) {
    this.contactService.setSelection(item);
    this.setAssignedTo(item);
  }
  
  /**
   * Updates the list of contacts assigned to the task.
   * @param item - Contact to add or remove from assignment
   */
  setAssignedTo(item: Contact) {
    const index = this.taskService.tempAssignedTo.findIndex((c) => c.id === item.id);
    if (item.selected) {
      if (index === -1) {
        this.taskService.tempAssignedTo.push(item);
      }
    } else {
      if (index !== -1) {
        this.taskService.tempAssignedTo.splice(index, 1);
      }
    }
  }

  /**
   * Adds a new subtask to the current task.
   */
  addSubtask() {
    if (this.newSubtask.title) {
      let subTask = { title: this.newSubtask.title, isDone: false };
      this.taskService.currentSubtasks.push(subTask);
      this.newSubtask.title = '';
      this.showActionIcons = false;
    }
  }

  /**
   * Clears the subtask input field.
   */
  clearInput() {
    this.newSubtask.title = '';
  }
  
  /**
   * Begins editing of an existing subtask.
   * @param index - Index of the subtask to edit
   */
  editSubtask(index: number) {
    this.editedIndex = index;
    this.editableSubtask = this.taskService.currentSubtasks[index];
  }

  /**
   * Saves changes to an edited subtask.
   * @param index - Index of the subtask being edited
   */
  saveEditedSubtask(index: number) {
    this.taskService.currentSubtasks[index] = { title: this.editableSubtask.title, isDone: false };
    this.editedIndex = null;
    this.editableSubtask.title = '';
  }

  /**
   * Counts the number of completed subtasks.
   * @param task - Task to check for completed subtasks
   * @returns Number of completed subtasks
   */
  getCompletedSubtasks(task: Task): number {
    if (!task.subtasks) return 0;
    return task.subtasks.filter((t) => t.isDone).length;
  }

  /**
   * Removes a subtask from the current task.
   * @param index - Index of the subtask to delete
   */
  deleteSubtask(index: number) {
    this.taskService.currentSubtasks.splice(index, 1);
    if (this.editedIndex === index) {
      this.editedIndex = null;
      this.editableSubtask.title = '';
    }
  }

  /**
   * Removes all subtasks and resets the form.
   */
  resetSubtasks() {
    this.taskService.currentSubtasks = [];
    this.resetForm();
  }

  /**
   * Submits the task form, either creating a new task or updating an existing one.
   */
  submitTask() {
    this.taskService.taskData.assignedTo = [];
    this.taskService.tempAssignedTo.forEach((c) => this.taskService.taskData.assignedTo!.push(c));
    this.taskService.taskData.subtasks = this.taskService.currentSubtasks;
    if (this.overlayService.setTemplate() == 'add-task') {
      if(this.taskService.taskData.priority == ''){
        this.taskService.taskData.priority = 'Medium';
      }
      this.taskService.addTask(this.taskService.taskData);
    } else if (this.overlayService.setTemplate() == 'edit-task') {
      this.taskService.updateTask(this.taskService.taskData.id, this.taskService.taskData);
    }
    this.resetExtrasTask();    
  }

  /**
   * Marks all form inputs as untouched to reset validation visual states.
   */
  setInputsUntouched() {
    if (this.taskTitle) this.taskTitle.control.markAsUntouched();
    if (this.taskDate) this.taskDate.control.markAsUntouched();
    if (this.categoryField) this.categoryField.control.markAsUntouched();
  }
  
  /**
   * Resets the entire form to default values.
   */
  resetForm() {    
    this.taskService.clickedButton.set('Medium');
    this.taskService.taskData = {
      id: '',
      title: '',
      description: '',
      date: '',
      priority: 'Medium',
      assignedTo: [],
      category: '',
      subtasks: [],
      status: '',
      dropDownOpen: false
    };
    this.resetExtrasForm();
   
  }

  /**
   * Resets additional form elements beyond the main task data.
   */
  resetExtrasForm() {
    this.taskService.tempAssignedTo = [];
    this.clearDate();
    this.resetContacts();
    this.setInputsUntouched();
  }

  /**
   * Performs a complete reset after task submission and navigates to the board.
   */
  resetExtrasTask() {
    this.resetSubtasks();
    this.setInputsUntouched();
    this.overlayService.closeOverlay();
    this.router.navigate(['/board']);
  }

  /**
   * Resets all contacts to an unselected state.
   */
  resetContacts() {
    this.contactService.contactList.forEach((contact) => {
      contact.selected = false;
    });
  }

  /**
   * Validates if the form has all required fields filled.
   * @returns Boolean indicating if the form is valid
   */
  isFormValid() {
    return this.taskService.taskData.title !== '' && this.taskService.taskData.date !== '' && this.taskService.taskData.category !== '';
  }

  /**
   * Filters contacts based on the search term.
   * @returns Filtered list of contacts
   */
  filterContacts() {
    if (!this.searchTerm) return this.contactService.contactList;
    return this.contactService.contactList.filter((c) => c.name.toLowerCase().includes(this.searchTerm.toLocaleLowerCase()));
  }

  /**
   * Test function for checking ngModel binding.
   */
  checkngmodel() {
    this.taskService.taskData.title = 'Test';
  }

  /**
   * Gets today's date in ISO string format.
   * @returns ISO formatted date string
   */
  getTodayISOString(): string {
    return this.inputDateService.getTodayISOString();
  }

  /**
   * Opens the native date picker.
   */
  openDatePicker(): void {
    this.hiddenDateInput.nativeElement.showPicker();
  }

  /**
   * Handles changes from the native date picker.
   */
  onDatePickerChange(): void {
    if (!this.taskService.taskData.date) return;

    const selectedDate = new Date(this.taskService.taskData.date);

    if (this.inputDateService.isFutureDate(selectedDate)) {
      const { day, month, year } = this.inputDateService.parseISOToParts(this.taskService.taskData.date);
      this.displayDate = this.inputDateService.formatDateDisplay(day, month, year);
    } else {
      this.setTodayAsDefault();
    }
  }

  /**
   * Handles manual date input changes and formats appropriately.
   * @param event - Input change event
   */
  onInputChange(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const sanitized = this.inputDateService.sanitizeInput(input);
    const withSlashes = this.inputDateService.addSlashes(sanitized);
    const limited = this.inputDateService.limitLength(withSlashes);
    this.displayDate = limited;
    const parsed = this.inputDateService.parseDateFromDisplay(limited);
    if (parsed) {
      const isoDate = this.inputDateService.formatDateISO(parsed.day, parsed.month, parsed.year);
      this.taskService.taskData.date = isoDate;
      if (this.hiddenDateInput) {
        this.hiddenDateInput.nativeElement.value = isoDate;
      }
    }
  }

  /**
   * Clears the date fields.
   */
  clearDate() {
    this.displayDate = '';
    this.taskService.taskData.date = '';
  }

  /**
   * Formats the date input to ensure valid format and future date.
   */
  formatDate(): void {
    if (!this.displayDate) {
      this.taskService.taskData.date = '';
      return;
    }

    const parsed = this.inputDateService.parseDateFromDisplay(this.displayDate);
    if (!parsed) {
      this.setTodayAsDefault();
      return;
    }

    const isoDate = this.inputDateService.formatDateISO(parsed.day, parsed.month, parsed.year);
    const date = new Date(isoDate);

    if (this.inputDateService.isValidDate(date) && this.inputDateService.isFutureDate(date)) {
      this.taskService.taskData.date = isoDate;
      this.displayDate = this.inputDateService.formatDateDisplay(parsed.day, parsed.month, parsed.year);
    } else {
      this.setTodayAsDefault();
    }
  }

  /**
   * Handles keydown events for date input to restrict invalid characters.
   * @param event - Keyboard event
   */
  onKeydown(event: KeyboardEvent): void {
    if (!this.inputDateService.isInputAllowed(event.key)) {
      event.preventDefault();
      return;
    }

    const input = event.target as HTMLInputElement;
    if (this.inputDateService.shouldBlockInput(input.value.length, event.key)) {
      event.preventDefault();
    }
  }

  /**
   * Sets today's date as the default date value.
   */
  private setTodayAsDefault(): void {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    this.taskService.taskData.date = this.inputDateService.formatDateISO(day, month, year);
    this.displayDate = this.inputDateService.formatDateDisplay(day, month, year);
  }
}