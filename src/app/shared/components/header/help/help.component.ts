import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @component
 * The HelpComponent provides users with help and support options.
 */
@Component({
  selector: 'app-help',
  imports: [],
  templateUrl: './help.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './help.component.scss',
})
export class HelpComponent {
  /**
   * The support email address for user assistance.
   */
  supportEmail = 'aghirculesei@gmail.com';

  /**
   * Angular Router used for navigation.
   */
  private router = inject(Router);

  /**
   * Navigates the user back to the summary page.
   */
  onBackClick(): void {
    this.router.navigate(['/summary']);
  }
}
