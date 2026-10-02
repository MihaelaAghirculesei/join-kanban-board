import { Component, ViewChild, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../services/contact.service';
import { OverlayService } from '../../../services/overlay.service';

/**
 * Component responsible for displaying and interacting with a list of contacts.
 */
@Component({
  selector: 'app-contact-list',
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  constructor(
    public contactService: ContactService,
    private overlayService: OverlayService
  ) {}

  /**
   * Emits an event to transform the contact view to a single contact display.
   */
  @Output() singleContactTransform = new EventEmitter<string>()

  /**
   * Sets the overlay buttons and opens the 'add-contact' overlay.
   * 
   * @param leftButton - Label for the left overlay button
   * @param rightButton - Label for the right overlay button
   */
  setOverlayButtonsFromList(leftButton: string, rightButton: string) {
    this.overlayService.setOverlayButtons(leftButton, rightButton)    
    this.overlayService.openOverlay('add-contact');
  }

  /**
   * Emits a transformation event to slide the single contact view into position.
   */
  toggleSingleContact() {
    this.singleContactTransform.emit('translateX(0%)')
  }
}
