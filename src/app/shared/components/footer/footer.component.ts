import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * @component
 * The FooterComponent displays the application's footer section.
 */
@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
