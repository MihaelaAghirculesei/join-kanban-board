import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
 showSubMenu = false;

  toggleSubMenu(event: MouseEvent) {
    event.stopPropagation(); // Verhindert, dass der Klick auch im "overlay" landet
    this.showSubMenu = !this.showSubMenu;
  }

  closeSubMenu() {
    this.showSubMenu = false;
  }

  onSubMenuClick(event: MouseEvent) {
    event.stopPropagation(); // Klicks im Sub-Menü sollen es nicht schließen
  }

  logoutCurrentUser() {
    console.log("User logged out");
    this.closeSubMenu();
  }
}
