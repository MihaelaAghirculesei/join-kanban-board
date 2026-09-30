import { Component, ViewChild, Input, Output, EventEmitter, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NgForm, NgModel } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { FeedbackServiceService } from '../../../services/feedback.service';
import { OverlayService } from '../../../services/overlay.service';

/**
 * Component for adding and editing contacts
 * Handles contact form validation and submission
 */
@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
})
export class AddContactComponent {
 
  /**
   * Component constructor
   * @param contactService - Service for managing contacts
   * @param feedbackService - Service for displaying feedback messages
   * @param overlayService - Service for managing overlay functionality
   */
  constructor(public contactService: ContactService, public feedbackService: FeedbackServiceService, public overlayService: OverlayService){
  }

  /** Text for the component header */
  h2Text: string = 'Add Contact'
  /** Reference to overlay element */
  @ViewChild('overlayRef') overlayRef!: ElementRef;
  
  /** Array to track invalid form fields */
  invalidFields: string[] = [];
  /** Flag to control success message visibility */
  showSuccessMessage:boolean = false;

  /**
   * Handles clicks outside the contact form to close overlay
   * @param event - The mouse event
   */
  handleBackdropClick(event: MouseEvent) {
    const clickedInside = this.overlayRef.nativeElement.contains(event.target);
    if (!clickedInside && this.overlayService.isOpen()) {
      this.clearForm();
      this.overlayService.closeOverlay();
      this.invalidFields = []
    }
  }
  
  /**
   * Validates a specific form field and updates invalid fields array
   * @param field - The field name to validate
   */
  validateForm(field: string) {
    this.invalidFields = this.invalidFields.filter(f => f !== field);
    if(field === 'name'){
    this.validateName()
  }
    if(field === 'email'){
    this.validateEmail()
  }
  if( field === 'phone'){
    this.validatePhone()
  }
  }

  /**
   * Validates the name field
   * Adds to invalid fields if validation fails
   */
  validateName(){
    if (!this.contactService.contactData.name || this.contactService.contactData.name.length < 2) {
      this.invalidFields.push('name');      
    }
  }

  /**
   * Validates the email field
   * Checks format and uniqueness
   * Adds to invalid fields if validation fails
   */
  validateEmail(){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      !this.contactService.contactData.email || 
      !emailRegex.test(this.contactService.contactData.email) || 
      (emailRegex.test(this.contactService.contactData.email) &&
       this.contactService.contactList.some(
         contact => contact.email === this.contactService.contactData.email
       ) && this.overlayService.buttonRight == 'Create Contact')
    ) {
      this.invalidFields.push('email');
    }
  }
  
  /**
   * Validates the phone field
   * Checks against phone number pattern
   * Adds to invalid fields if validation fails
   */
  validatePhone(){
    const phoneRegex = /^(?:\+?\d{1,4}[ \-]?)?(\(?\d{1,4}\)?[ \-]?)?[\d\- ]{5,15}$/;
    if (!this.contactService.contactData.phone || !phoneRegex.test(this.contactService.contactData.phone)) {
      this.invalidFields.push('phone');
    }
  }

  /**
   * Checks if the entire form is valid
   * @returns Boolean indicating if all form fields pass validation
   */
  isFormValid(): boolean {
    return (
      this.contactService.contactData.name.length >= 2 &&
      (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.contactService.contactData.email) && !this.contactService.contactList.some(
        contact => contact.email === this.contactService.contactData.email
      ) && this.overlayService.buttonRight == 'Create Contact') &&
      /^(?:\+?\d{1,4}[ \-]?)?(\(?\d{1,4}\)?[ \-]?)?[\d\- ]{5,15}$/.test(this.contactService.contactData.phone)
      
    ) || ( this.contactService.contactData.name.length >= 2 && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.contactService.contactData.email) && this.overlayService.buttonRight == 'Save') ;
  }

  /**
   * Handles cancel or delete button action
   * Deletes contact if in delete mode, otherwise just closes overlay
   */
  cancelOrDelete(){
    if(this.overlayService.buttonLeft == 'Delete'){
      this.contactService.deleteContact();
      this.feedbackService.show('Contact successfully deleted!');
    }
    this.overlayService.closeOverlay();
    this.invalidFields = []
    this.clearForm();
  }

  /**
   * Determines and executes the appropriate action based on button text
   * Either adds a new contact or saves changes to existing contact
   */
  addOrSave(){
    if(this.overlayService.buttonRight == 'Create Contact'){
      this.addContact()
    }else if(this.overlayService.buttonRight == 'Save'){
     this.saveContact()
    }
  }

  /**
   * Adds a new contact to the contact list
   * Shows feedback and closes overlay
   */
  addContact(){
      this.contactService.addContact(this.contactService.contactData);
      this.clearForm();           
      this.overlayService.closeOverlay()
      this.feedbackService.show('Contact added!');
  }

  /**
   * Updates an existing contact
   * Shows feedback and closes overlay
   */
  saveContact(){
      this.contactService.updateContact(this.contactService.contactData);
      this.feedbackService.show('Contact changed!');
      this.clearForm();
      this.overlayService.closeOverlay()
  }

  /**
   * Resets the form fields and validation state
   */
  clearForm(){
    this.contactService.contactData.name= '';
    this.contactService.contactData.email = '';
    this.contactService.contactData.phone= '';
    this.invalidFields = []
  }
}