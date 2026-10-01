import { Component, ViewChild, Input, Output, EventEmitter, HostListener, ElementRef, signal, effect  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NgForm, NgModel } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { FeedbackServiceService } from '../../../services/feedback.service';
import { OverlayService } from '../../../services/overlay.service';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { TaskComponent } from '../../task/task.component';

/**
 * Component responsible for displaying and managing overlay content.
 */
@Component({
  selector: 'app-overlay',
  imports: [CommonModule, FormsModule, AddContactComponent, AddTaskComponent, TaskComponent],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
})
export class OverlayComponent {

  constructor(
    public contactService: ContactService,
    public feedbackService: FeedbackServiceService,
    public overlayService: OverlayService
  ) {}

  /**
   * Reference to the overlay element in the template.
   */
  @ViewChild('overlayRef') overlayRef!: ElementRef;


  /**
   * Handles clicks on the backdrop to close the overlay if clicked outside the content.
   * 
   * @param event - MouseEvent triggered by the user click
   */
  handleBackdropClick(event: MouseEvent) {
    const clickedInside = this.overlayRef.nativeElement.contains(event.target);
    if (!clickedInside && this.overlayService.isOpen()) {   
      event.stopPropagation();   
      this.overlayService.closeOverlay();     
    }
  }
  
}
