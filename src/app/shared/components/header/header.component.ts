import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  showMenu = false;

  constructor(private router: Router) {
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }

  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-section')) {
      this.closeMenu();
    }
  }

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }

  handleMenuItemClick(action: string) {
    switch (action) {
      case 'legal-notice':
        this.router.navigate(['/legal-notice']);
        break;
      case 'privacy-policy':
        this.router.navigate(['/privacy-policy']);
        break;
      case 'logout':
        this.logout();
        break;
    }
    this.closeMenu();
  }

  logout() {
    console.log('Logout erfolgreich');
    this.router.navigate(['/login']); // zu anpassen an Logout-Route
  }

  navigateToHelp(event: MouseEvent) {
    event.stopPropagation();
    console.log('Help-Icon geklickt');
    this.router.navigate(['/help']);
    console.log('Help-Icon geklickt');  
    this.router.navigate(['/help']);
  }
}
