import { Component, inject } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

/**
 * @component
 * The SidebarComponent displays the application's sidebar, including navigation and footer.
 */
@Component({
  selector: 'app-sidebar',
  imports: [FooterComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  /**
   * Injected authentication service.
   */
  authService = inject(AuthService)

}
