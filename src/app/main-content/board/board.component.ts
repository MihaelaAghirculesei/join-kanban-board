import { Component, ElementRef, inject, ViewChild, HostListener, signal } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayService } from '../../services/overlay.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { TaskComponent } from '../task/task.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDragPreview } from '@angular/cdk/drag-drop';
import { Router, RouterLink } from '@angular/router';

/**
 * Component for managing task board functionality.
 * Handles task display, search, filtering, and drag-drop operations.
 */
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule, CdkDrag, CdkDropList, CdkDragPreview, RouterLink],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent  {
  /** Flag to track if search is active */
  isActive = false;
 
  desktopView = signal(window.innerWidth < 1440);
  
  /** Search query string */
  searchQuery = '';
  /** Service for managing overlay content */
  overlayService = inject(OverlayService);
  /** Service for managing tasks */
  taskService = inject(TaskService);
    /** Service for managing routes */
  router = inject(Router);
  /** Flag to track if dropdown is open */
  dropDownOpen: boolean = false;
  /** Flag to track if the device is mobile */
  isMobile = false;
  /** Reference to the overlay element */
  @ViewChild('overlayRef') overlayRef!: ElementRef;
  /** Reference to the dropdown overlay element */
  @ViewChild('overlayRef') overlayRefDropDown!: ElementRef;

  /**
   * Initializes the responsive layout flags.
   */
  constructor() {
    this.checkWindowSize();
  }

  /**
   * Updates the status of a task
   * @param status - The new status to set
   * @param task - The task to update
   */
  setNewStatus(status: string, task: Task) {
    task.status = status;
    task.dropDownOpen = false;
    this.taskService.updateTask(task.id, task);
  }

  /**
   * Toggles the search functionality
   * Resets search query when deactivated
   */
  toggleActive() {
    this.isActive = !this.isActive;
    if (!this.isActive) {
      this.searchQuery = '';
    }
  }

  /**
   * Toggles the dropdown visibility for a task
   * @param task - The task associated with the dropdown
   */
  openDropDown(task: Task) {
    task.dropDownOpen = !task.dropDownOpen;
  }

  /**
   * Handles input changes for search and filtering
   * @param event - The input event
   * @param inputField - The field to search/filter on
   */
  onInputChange(event: Event, inputField: string) {
    this.taskService.searchAndFilter(event, inputField);
  }

  /**
   * Global click handler to close task dropdowns when clicking outside
   * @param event - The mouse event
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.taskService.boardColumns.forEach((taskList) => {
      taskList.list.forEach((task) => {
        const dropdownElement = document.getElementById('dropdown' + task.id);
        if (task.dropDownOpen && dropdownElement && !dropdownElement.contains(event.target as Node)) {
          task.dropDownOpen = false;
        }
      });
    });
  }

  /**
   * Handles clicks on the backdrop to close overlay if needed
   * @param event - The mouse event
   * @param task - The associated task
   */
  handleBackdropClick(event: MouseEvent, task: Task) {
    const clickedInside = this.overlayRef.nativeElement.contains(event.target);
    if (!clickedInside && this.overlayService.isOpen()) {
      this.overlayService.closeOverlay();
    }
  }

  /**
   * Sets the status for a new task
   * @param status - The status to set
   */
  setNewTaskStatus(status: string) {
    this.taskService.newTaskStatus = status;
  }

  /**
   * Calculates the number of completed subtasks for a task
   * @param task - The task to check
   * @returns The number of completed subtasks
   */
  getCompletedSubtasks(task: Task): number {
    return task.subtasks?.filter((t) => t.isDone).length || 0;
  }

  /**
   * Calculates the progress width percentage for the task progress bar
   * @param task - The task to calculate progress for
   * @returns The progress width as a percentage
   */
  getProgressWidth(task: Task): number {
    if (!task.subtasks?.length) return 0;
    return (this.getCompletedSubtasks(task) / task.subtasks.length) * 100;
  }

  /**
   * Opens the task detail view
   * @param task - The task to display details for
   */
  openTaskDetail(task: Task) {
    this.taskService.setSelectedTask(task);
    this.overlayService.openOverlay('show-task');
  }

  /** Lists that can be connected for drag-drop operations */
  connectedDropLists = ['todoList', 'inProgressList', 'awaitFeedbackList', 'doneList'];

  /**
   * Handles the drop event for drag-drop operations
   * @param event - The drag drop event
   * @param newStatus - The new status for the task
   */
  drop(event: CdkDragDrop<Task[]>, newStatus: string) {
    const task = event.previousContainer.data[event.previousIndex];
    if (this.isMobile) return;
    if (event.previousContainer !== event.container) {
      task.status = newStatus;
      this.taskService.updateTask(task.id, task);
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  /**
   * Updates the responsive layout flags whenever the window is resized.
   */
  @HostListener('window:resize')
  checkWindowSize() {
    this.isMobile = window.innerWidth <= 1280;
    this.desktopView.set(window.innerWidth < 1440);
  }

  /**
   * Navigates to the specified route.
   * @param target - Route path to navigate to
   */
  goToAnotherPage(target: string): void {
    this.router.navigate([target]);
  }
}
