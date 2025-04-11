import { Component, ViewChild, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NgForm, NgModel } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact-overlay',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-overlay.component.html',
  styleUrl: './contact-overlay.component.scss',
})
export class ContactOverlayComponent {
  @Input() isOpen: boolean = false;
  @Output() closeOverlay = new EventEmitter<void>();
  constructor(public contactService: ContactService){
    
  }
  contactData: {
    name: string;
    email: string;
    phone: string;
  } = {
    name: '',
    email: '',
    phone: '',
  };
  invalidFields: string[] = [];

  validateForm(field: string) {
    this.invalidFields = this.invalidFields.filter(f => f !== field);
    if(field === 'name'){
    if (!this.contactData.name || this.contactData.name.length < 3) {
      this.invalidFields.push('name');
      this.contactData.name = ''; 
    }
  }
    if(field === 'email'){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.contactData.email || !emailRegex.test(this.contactData.email)) {
      this.invalidFields.push('email');      
      this.contactData.email = ''; 
    }
  }
  if( field === 'phone'){
    const phoneRegex = /^(?:\+?\d{1,4}[ \-]?)?(\(?\d{1,4}\)?[ \-]?)?[\d\- ]{5,15}$/;
    if (!this.contactData.phone || !phoneRegex.test(this.contactData.phone)) {
      this.invalidFields.push('phone');
      this.contactData.phone = ''; 
    }
  }   
  }

  isFormValid(): boolean {
    return (
      this.contactData.name.length >= 3 &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.contactData.email) &&
      /^(?:\+?\d{1,4}[ \-]?)?(\(?\d{1,4}\)?[ \-]?)?[\d\- ]{5,15}$/.test(this.contactData.phone)
    );
  }

  toggleOverlay() {
    this.isOpen = !this.isOpen;
    this.toggleBodyScroll(this.isOpen);
  }

 
  toggleBodyScroll(disable: boolean) {
    if (disable) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  clearForm(){
    this.contactData.name= '';
    this.contactData.email = '';
    this.contactData.phone= '';
  }
  
}
