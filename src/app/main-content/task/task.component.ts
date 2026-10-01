import { Component, inject, effect } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
import { TaskService } from '../../services/task.service';
import { ContactService } from '../../services/contact.service';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { FeedbackServiceService } from '../../services/feedback.service';
import { Task } from '../../interfaces/task';
import { NgModel, FormsModule } from '@angular/forms';

/**
 * Component responsible for displaying and interacting with a selected task.
 */
@Component({
  selector: 'app-task',
  imports: [NgStyle, NgClass, FormsModule, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  overlayService = inject(OverlayService)
  taskService = inject(TaskService)
  contactService = inject(ContactService)
  feedbackService = inject(FeedbackServiceService)

  /**
   * The currently selected task.
   */
  task = this.taskService.selectedTask();

  constructor() {
    /**
     * Updates the task signal reactively whenever the selected task changes.
     */
    effect(() => {
      this.task = this.taskService.selectedTask();
    })
  }

  /**
   * Deletes the given task by ID and closes the overlay.
   * @param id - The ID of the task to be deleted.
   */
  deleteTask(id: string) {
    this.taskService.deleteTask(id)
    this.overlayService.closeOverlay()
  }

  /**
   * Opens the edit overlay for the given task and prepares it for editing.
   * @param task - The task to be edited.
   */
  editTask(task: Task) {
    this.taskService.setEditedTask(task);
    this.overlayService.openOverlay('edit-task');
    this.taskService.setTempAssignedTo(task.assignedTo!);
  }

  /**
   * Toggles the completion status of a subtask and updates the task.
   * @param task - The task containing the subtask.
   * @param subtask - The subtask whose status will be toggled.
   */
  updateSubtasks(task: Task, subtask: { title: string, isDone: boolean }) {
    subtask['isDone'] = !subtask['isDone']
    this.taskService.updateTask(task.id, task)
  }
}
