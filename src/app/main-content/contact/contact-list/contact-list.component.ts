import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../../interfaces/contact';
import { ContactOverlayComponent } from '../contact-overlay/contact-overlay.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactOverlayComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {


  constructor(public contactService: ContactService){
    
  }
 
  @ViewChild('contactOverlay') contactOverlay!: ContactOverlayComponent;

  toggleOverlayFromList() {    
      this.contactOverlay.toggleOverlay();
    }  

  selectedIndex: number | null = null;
  selectItem(index: number) {
    this.selectedIndex = index;
  }

  
}
