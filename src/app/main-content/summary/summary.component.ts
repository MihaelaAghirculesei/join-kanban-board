import { Component, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

/**
 * Summary component that displays task statistics and a personalized greeting.
 */
@Component({
  selector: 'app-summary',
  imports: [CommonModule, RouterModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  private taskService = inject(TaskService);
  authService = inject(AuthService);

  /**
   * Computed signal indicating if the task list has finished loading.
   */
  isLoaded = computed(() => this.taskService.isTasksLoaded());

  /**
   * Computed signal returning a sorted list of future urgent tasks.
   */
  urgentTask = computed(() => {
    if (!this.isLoaded()) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    return this.taskService.tasksList
        .filter(task => task.priority === 'Urgent')
        .filter(task => new Date(task.date) >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
});


  /**
   * Computed signal returning the number of urgent tasks.
   */
  urgentTasksCount = computed(() => this.urgentTask().length);

  /**
   * Computed signal returning the date of the next urgent task, or null if none exist.
   */
  nextUrgentDate = computed(() => {
    const next = this.urgentTask()[0];
    return next ? next.date : null;
  });

  /**
   * Computed signal returning a message about the presence of upcoming urgent tasks.
   */
  nextUrgentText = computed(() => {
    return this.urgentTask().length > 0
      ? 'Upcoming Deadline'
      : 'No upcoming urgent tasks';
  });

  /**
   * Computed signal returning the number of tasks with status "ToDo".
   */
  todoCount = computed(() => {
    if (!this.isLoaded()) return 0;
    return this.taskService.tasksList.filter((t) => t.status === 'ToDo').length;
  });

  /**
   * Computed signal returning the number of tasks with status "Done".
   */
  doneCount = computed(() => {
    if (!this.isLoaded()) return 0;
    return this.taskService.tasksList.filter((t) => t.status === 'Done').length;
  });

  /**
   * Computed signal returning the total number of tasks.
   */
  totalCount = computed(() => {
    if (!this.isLoaded()) return 0;
    return this.taskService.tasksList.length;
  });

  /**
   * Computed signal returning the number of tasks in progress.
   */
  inProgressCount = computed(() => {
    if (!this.isLoaded()) return 0;
    return this.taskService.tasksList.filter((t) => t.status === 'In Progress')
      .length;
  });

  /**
   * Computed signal returning the number of tasks awaiting feedback.
   */
  awaitFeedbackCount = computed(() => {
    if (!this.isLoaded()) return 0;
    return this.taskService.tasksList.filter(
      (t) => t.status === 'Await Feedback'
    ).length;
  });

  /**
   * Signal storing the username of the currently logged-in user.
   */
  userName = signal(this.authService.UserLoggedIn);

  /**
   * Computed signal returning a greeting based on the current time of day.
   */
  greeting = computed(() => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  });
}
