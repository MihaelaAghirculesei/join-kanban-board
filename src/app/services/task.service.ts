import { Injectable, OnDestroy, signal } from '@angular/core';
import { inject } from '@angular/core';
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { AUTH, FIRESTORE, authState } from '../firebase';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Task } from '../interfaces/task';
import { ContactService } from './contact.service';
import { Contact } from '../interfaces/contact';
import { FeedbackServiceService } from './feedback.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnDestroy {
  firestore = inject(FIRESTORE);
  feedbackService = inject(FeedbackServiceService)
  unsubTasksList: any;
  tasksList: Task[] = [];
  boardTasksListToDo: Task[] = [];
  boardTasksListDone: Task[] = [];
  boardTasksListProgress: Task[] = [];
  boardTasksListFeedback: Task[] = [];
  boardColumns = [
      { title: 'To Do', status: 'ToDo', list: this.boardTasksListToDo, dropListName:'todoList', emptyText: 'No tasks To do' },
      { title: 'In Progress', status: 'In Progress', list: this.boardTasksListProgress, dropListName:'inProgressList', emptyText: 'No tasks in progress' },
      { title: 'Await Feedback', status: 'Await Feedback', list: this.boardTasksListFeedback, dropListName:'awaitFeedbackList', emptyText: 'No tasks awaiting feedback' },
      { title: 'Done', status: 'Done', list: this.boardTasksListDone, dropListName:'doneList', emptyText: 'No completed tasks' }
    ];
  isBoardListFull: boolean = false;
  searchInputFieldValue: string= '';
  newTaskStatus: string= '';
  selectedTask = signal<Task | null>(null);
  currentEditedTask = signal<Task | null>(null);
  clickedButton= signal<string>('Medium') ;
  currentSubtasks:{
    title:string;
    isDone:boolean
  }[]=[];
  taskData: Task= {
    id:'',
    title: '',
    description: '',
    date: '',
    priority: 'Medium',
    assignedTo:[],
    category:'',
    subtasks:[],
    status: '',
    dropDownOpen: false
  };
  tempAssignedTo:Contact[]=[];

  priorityOrder = {
    "Urgent": 1,
    "Medium": 2,
    "Low": 3,
    "": 4
  };

  /**
   * Initializes the TaskService and listens to task changes while a user is signed in.
   */
  constructor() {
    authState(inject(AUTH))
      .pipe(takeUntilDestroyed())
      .subscribe((user) => (user ? this.snap() : this.stopListening()));
  }

  /**
   * Fills the board columns with tasks based on their status and sorts them by priority.
   */
  fillBoardTaskLists(){
    this.boardColumns.forEach(column =>{
      column.list = [];
    })
    this.tasksList.forEach((task)=>{
      if(task.status == 'ToDo'){
        this.boardColumns[0].list.push(task);
      }else if(task.status == 'In Progress'){
        this.boardColumns[1].list.push(task);
      }else if(task.status == 'Await Feedback'){
        this.boardColumns[2].list.push(task);
      }else if(task.status == 'Done'){
        this.boardColumns[3].list.push(task);
      }
    });
    this.boardColumns.forEach(column=>{
      column.list.sort((task1, task2) => this.priorityOrder[task1.priority] - this.priorityOrder[task2.priority]);
    })
  }

  /**
   * Converts a priority value to a string. (Currently not implemented)
   * @param {string} proirity - The priority to convert.
   */
  proirityToString(proirity: string){
    return
  }

  /**
   * Sets the temporary assigned contacts for a task.
   * @param {Contact[]} contacts - The contacts to assign temporarily.
   */
  setTempAssignedTo(contacts:Contact[]){
    this.tempAssignedTo = contacts;
  }

  /**
   * Sets the current task data to be edited.
   * @param {Task} task - The task to edit.
   */
  setEditedTask(task: Task) {
    this.taskData.title = task.title;
    this.taskData.description = task.description;
    this.taskData.date = task.date;
    this.clickedButton.set(task.priority);
    this.taskData.priority= task.priority
    this.taskData.category = task.category;
    this.currentSubtasks = task.subtasks;
    this.taskData.assignedTo = task.assignedTo;
    this.taskData.id = task.id
    this.taskData.status = task.status
  }

  isTasksLoaded = signal(false);

  /**
   * Subscribes to Firestore task changes and updates the local task lists.
   */
  snap() {
    this.unsubTasksList?.();
    let q = query(this.getTasksRef(), orderBy('priority'));
    this.unsubTasksList = onSnapshot(q, (list) => {
      this.tasksList = [];
      list.forEach((element) => {
        this.tasksList.push(this.setTaskObj(element.data(), element.id));
      });
      this.fillBoardTaskLists();
      this.isBoardListFull = true;
      this.isTasksLoaded.set(true);
    }, (err) => console.error(err));
  }

  /**
   * Stops listening to task changes and clears the local task lists (e.g. after logout).
   */
  stopListening() {
    this.unsubTasksList?.();
    this.unsubTasksList = undefined;
    this.tasksList = [];
    this.fillBoardTaskLists();
    this.isTasksLoaded.set(false);
  }

  /**
   * Adds a new task to Firestore and updates the board.
   * @param {Task} task - The task to add.
   */
  async addTask(task: Task) {
    task.status = this.newTaskStatus;
    task.priority= this.taskData.priority
    task.dropDownOpen = false;
    if (task.status == '') {
      task.status = 'ToDo';
    }
    await addDoc(this.getTasksRef(), task)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {});
    this.fillBoardTaskLists();
    this.feedbackService.show('Task Created')
  }

  /**
   * Updates an existing task in Firestore and refreshes the board.
   * @param {string} taskId - The ID of the task to update.
   * @param {{}} taskData - The data to update.
   */
  async updateTask(taskId: string, taskData: {}){
    await updateDoc(this.getSingleTask('tasks', taskId), taskData);
    this.fillBoardTaskLists();
    this.feedbackService.show('Task Updated')
  }

  /**
   * Deletes a task from Firestore and updates the board.
   * @param {string} id - The ID of the task to delete.
   */
  async deleteTask(id: string) {
    if (id) {
      await deleteDoc(this.getSingleTask('tasks', id));
    }
    this.fillBoardTaskLists();
    this.feedbackService.show('Task Deleted')
  }

  /**
   * Cleans up the Firestore subscription on service destroy.
   */
  ngOnDestroy() {
    this.unsubTasksList?.();
  }

  /**
   * Creates a Task object from Firestore data and ID.
   * @param {any} obj - The Firestore data object.
   * @param {string} id - The Firestore document ID.
   * @returns {Task} The constructed Task object.
   */
  setTaskObj(obj: any, id: string): Task {
    return {
      id: id,
      title: obj.title || '',
      description: obj.description || '',
      date: obj.date || '',
      priority: obj.priority || 'Medium',
      assignedTo: obj.assignedTo || [],
      category: obj.category || '',
      subtasks: obj.subtasks || [],
      status: obj.status || '',
      dropDownOpen: obj.dropDownOpen|| false
    };
  }

  /**
   * Gets the Firestore collection reference for tasks.
   * @returns The Firestore collection reference.
   */
  getTasksRef() {
    return collection(this.firestore, 'tasks');
  }

  /**
   * Gets a Firestore document reference for a single task.
   * @param {string} collectionRef - The collection name.
   * @param {string} docId - The document ID.
   * @returns The Firestore document reference.
   */
  getSingleTask(collectionRef: string, docId: string) {
    return doc(collection(this.firestore, collectionRef), docId);
  }

  /**
   * Handles search and filter input changes.
   * @param {Event} event - The input event.
   * @param {string} value - The search value.
   */
  searchAndFilter(event:Event, value: string){
    this.searchInputFieldValue = value;
  }

  /**
   * Sets the currently selected task.
   * @param {Task} task - The task to select.
   */
  setSelectedTask(task: Task) {
    this.selectedTask.set(task);
  }

  /**
   * Clears the currently selected task.
   */
  clearSelectedTask() {
    this.selectedTask.set(null);
  }

  /**
   * Returns the CSS class for a given category.
   * @param {string} category - The category name.
   * @returns {string} The corresponding CSS class.
   */
  getCategoryClass(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'User Story': 'user-story',
      'Technical Task': 'technical-task',
      'Design': 'design'
    };
    return categoryMap[category] || '';
  }
}
