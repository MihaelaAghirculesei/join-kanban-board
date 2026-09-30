import { Component, ViewChild, ElementRef, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ContactService } from '../../../services/contact.service';

/**
 * @component
 * The HeaderComponent displays the application's header and handles user menu interactions.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  /**
   * Injected authentication service.
   */
  authService = inject(AuthService)

  /**
   * Injected contact service.
   */
  contactService = inject(ContactService)

  /**
   * Indicates whether the menu is currently shown.
   */
  showMenu = false;

  /**
   * Reference to the menu element in the template.
   */
  @ViewChild('menuRef') menuRef!: ElementRef;

  /**
   * Handles clicks on the backdrop to close the menu if the click is outside the menu.
   * @param event The mouse event.
   */
  handleBackdropClick(event: MouseEvent) {
    if (this.menuRef && !this.menuRef.nativeElement.contains(event.target)) {
      this.showMenu = false;
    }
  }

  /**
   * Listens for document click events to detect clicks outside the menu.
   * @param event The mouse event.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.handleBackdropClick(event);
  }

  /**
   * Toggles the visibility of the menu and stops event propagation.
   * @param event The mouse event.
   */
  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  /**
   * Closes the menu.
   */
  closeMenu() {
    this.showMenu = false;
  }
}
