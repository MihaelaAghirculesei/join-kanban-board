import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FeedbackServiceService } from './services/feedback.service';
import { OverlayService } from './services/overlay.service';
import { OverlayComponent } from './main-content/contact/overlay/overlay.component';
import { AuthService } from './services/auth.service';
import { ScrollService } from './interfaces/scroll';

/**
 * @component
 * The AppComponent is the root component of the application.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, OverlayComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /**
   * Injected Angular Router instance.
   */
  router = inject(Router);

  /**
   * Injected authentication service.
   */
  authService = inject(AuthService);

  /**
   * Initializes the AppComponent with injected feedback and overlay services.
   * @param feedbackService The service for showing feedback messages.
   * @param overlayService The service for managing overlays.
   */
  constructor(public feedbackService: FeedbackServiceService, public overlayService: OverlayService, private scrollService: ScrollService){}

  /**
   * Checks if the current router URL contains the given path.
   * @param path The route path to check.
   * @returns True if the current URL includes the path, otherwise false.
   */
  getRouterPath(path: string) {
    return this.router.url.includes(path);
  }

/**
 * Checks if the current route is an authentication route.
 *
 * @returns {boolean} True if the current URL is '/', '/login', or '/sign-up', false otherwise
 * @memberof AppComponent
 */
  isAuthRoute() {
    return this.router.url === '/' || this.router.url === '/login' || this.router.url === '/sign-up';
  }

  
}
