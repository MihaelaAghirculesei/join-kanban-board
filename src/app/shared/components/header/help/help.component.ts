import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @component
 * The HelpComponent provides users with help and support options.
 */
@Component({
  selector: 'app-help',
  standalone: true,
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss',
})
export class HelpComponent {
  /**
   * The support email address for user assistance.
   */
  supportEmail = 'aghirculesei@gmail.com';

  /**
   * Initializes the HelpComponent and injects the Router service.
   * @param router The Angular Router used for navigation.
   */
  constructor(private router: Router) {}

  /**
   * Navigates the user back to the home page when called.
   */
  onBackClick(): void {
    this.router.navigate(['/summary']);
  }
}
