import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";

import { RouterOutlet } from '@angular/router';
import { ContactComponent } from './main-content/contact/contact.component';
import { ContactOverlayComponent } from './main-content/contact/contact-overlay/contact-overlay.component';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet, ContactOverlayComponent, ContactComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project';
}
