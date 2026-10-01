import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SingleContactComponent } from './single-contact/single-contact.component';
import { OverlayComponent } from './overlay/overlay.component';
import { OverlayService } from '../../services/overlay.service';

/**
 * Component responsible for managing the contact view, including the list and single contact details.
 */
@Component({
  selector: 'app-contact',
  imports: [CommonModule, ContactListComponent, SingleContactComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(public overlayService: OverlayService) {}

  /**
   * Controls the display of the menu.
   */
  menuDisplay: string = 'none';

  /**
   * Controls the display of the overlay for adding contacts.
   */
  addOverlayDisplay: string = 'none';

  /**
   * Reference to the SingleContactComponent used to invoke methods on the selected contact.
   */
  @ViewChild('singleContact') singleContact!: SingleContactComponent;

  /**
   * Image source path for the menu toggle icon.
   */
  menuImageSrc: string = "assets/img/4-contacts/person-add-icon.svg";

  /**
   * Defines the CSS transform for showing or hiding the single contact view.
   */
  singleContactTransform: string = window.innerWidth < 1280 ? 'translateX(200%)' : 'translateX(0%)';

  /**
   * Controls the display of the back button.
   */
  backBtnDisplay: string = 'none';

  /**
   * Window resize event listener to adapt UI based on screen width.
   */
  windowWidth = window.addEventListener('resize', () => {
    if (window.innerWidth < 1280) {
      this.getEvent('translateX(200%)');
    } else if (window.innerWidth > 1280) {
      this.getEvent('translateX(0%)');
      this.singleContactTransform = 'translateX(0%)';
    }
  });

  /**
   * Opens the add contact overlay or toggles the contact menu based on current icon state.
   */
  addOrOpenMenu() {
    if (this.menuImageSrc == 'assets/img/4-contacts/person-add-icon.svg') {
      this.overlayService.setOverlayButtons('Cancel', 'Create Contact');
      this.overlayService.openOverlay('add-contact');
    } else {
      if (this.menuDisplay == 'none') {
        this.menuDisplay = 'flex';
      } else {
        this.menuDisplay = 'none';
      }
    }
  }

  /**
   * Opens the overlay to edit the currently selected contact.
   */
  openEditOverlay() {
    this.singleContact.editContact();
  }

  /**
   * Deletes the currently selected contact and hides the single contact view if on small screens.
   */
  deleteContact() {
    this.singleContact.deleteContact();
    if (window.innerWidth < 1280) {
      this.getEvent('translateX(200%)');
    }
  }

  /**
   * Opens the overlay to add a new contact.
   */
  openAddOverlay() {
    this.overlayService.setOverlayButtons('Cancel', 'Create Contact');
    this.overlayService.openOverlay('add-contact');
  }

  /**
   * Handles the contact view transition and updates icons/buttons accordingly.
   * 
   * @param event - CSS transform value to apply to the single contact view
   */
  getEvent(event: string) {
    if (window.innerWidth < 1280) {
      this.singleContactTransform = event;
      if (event == 'translateX(0%)') {
        this.menuImageSrc = 'assets/img/4-contacts/more-vert-icon.svg';
        this.backBtnDisplay = 'flex';
      } else if (event == 'translateX(200%)') {
        this.menuImageSrc = 'assets/img/4-contacts/person-add-icon.svg';
        this.backBtnDisplay = 'none';
      }
    }
  }

  /**
   * Navigates back to the contact list view from the single contact view.
   */
  backToContactList() {
    this.getEvent('translateX(200%)');
    this.backBtnDisplay = 'none';
  }
}
