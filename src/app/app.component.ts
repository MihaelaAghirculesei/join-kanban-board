import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HelpComponent } from './shared/components/header/help/help.component';

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< Updated upstream
  imports: [CommonModule, RouterOutlet,HeaderComponent, SidebarComponent,],
=======
  imports: [CommonModule, RouterOutlet,ContactComponent, HeaderComponent, SidebarComponent, HelpComponent ],
>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project';
}
