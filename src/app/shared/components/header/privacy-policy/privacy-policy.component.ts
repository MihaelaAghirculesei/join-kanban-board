import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @component
 * The PrivacyPolicyComponent displays the privacy policy information for the application.
 */
@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  templateUrl: './privacy-policy.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

}
