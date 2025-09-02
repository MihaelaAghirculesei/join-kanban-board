import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FeedbackServiceService } from '../../services/feedback.service';
import { ContactService } from '../../services/contact.service';
import { NgClass, CommonModule } from '@angular/common';

/**
 * Component responsible for handling user login functionality.
 * This component manages authentication, form validation, and navigation after login.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  /** Service for handling user feedback notifications */
  feedbackService = inject(FeedbackServiceService);

  /** Service for handling contact-related operations */
  contactService = inject(ContactService);

  /** Stores user input for email or username */
  emailOrUsername = '';

  /** Stores user password input */
  password = '';

  /** Error message to display when authentication fails */
  error = '';

  /** Tracks which form fields have validation errors */
  invalidFields: string[] = [];

  /** Flag indicating whether login was successful */
  loginSuccessfull: boolean = true;


   /**
   * Indicates whether the password should be shown in plain text.
   */
  passwordVisible: boolean = false;

  /**
   * True if the user has entered any text into the password field.
   */
  passwordEntered: boolean = false;

  /**
   * Creates an instance of LoginComponent.
   *
   * @param routerModule - RouterModule (optional, likely unused here)
   * @param router - Angular Router service for navigation
   * @param authService - Service to perform authentication requests
   */
  constructor(
    private routerModule: RouterModule,  // optional – kann entfernt werden, falls nicht verwendet
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Navigates to a given route.
   *
   * @param target - The route path to navigate to (e.g., '/register')
   */
  goToAnotherPage(target: string): void {
    this.router.navigate([target]);
  }

  /**
   * Called on input event of the password field.
   * Tracks whether the user has entered text and hides the password if input is cleared.
   */
  onPasswordInput(): void {
    this.passwordEntered = this.password.length > 0;
    if (!this.passwordEntered) {
      this.passwordVisible = false;
    }
  }

  /**
   * Toggles password visibility if the password field is not empty.
   */
  togglePasswordVisibility(): void {
    if (this.passwordEntered) {
      this.passwordVisible = !this.passwordVisible;
    }
  }

  /**
   * Checks if the form inputs are valid.
   * @returns boolean indicating whether form is valid
   */
  get isFormValid() {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.emailOrUsername);
    return isEmailValid && this.password.length >= 6;
  }

  /**
   * Performs login with guest credentials.
   * Automatically navigates to summary page upon successful login.
   */
  async guestLogin() {
    await this.authService.login('guest@guest.de', '123456');
    this.authService.UserLoggedIn = 'Guest';
    this.router.navigate(['/summary']);
    localStorage.setItem('loggedIn', 'Guest');
  }

  /**
   * Validates the email field and updates invalidFields array.
   * @param field - Field name to validate
   */
  validateMail(field: string) {
    const addFieldIfInvalid = (condition: boolean, fieldName: string) => {
      if (condition && !this.invalidFields.includes(fieldName)) {
        this.invalidFields.push(fieldName);
      } else if (!condition) {
        this.invalidFields = this.invalidFields.filter(f => f !== fieldName);
      }
    };

    if (field === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const email = this.emailOrUsername;
      const isInvalid = !email || !emailRegex.test(email);
      addFieldIfInvalid(isInvalid, 'email');
    }
  }

   validatePassword() {
    const addFieldIfInvalid = (condition: boolean, fieldName: string) => {
      if (condition && !this.invalidFields.includes(fieldName)) {
        this.invalidFields.push(fieldName);
      } else if (!condition) {
        this.invalidFields = this.invalidFields.filter(f => f !== fieldName);
      }
    };
    const isInvalid = !this.password || this.password.length < 6;
    addFieldIfInvalid(isInvalid, 'password');


  }

  /**
   * Handles the login form submission.
   * Attempts to authenticate user and navigates to summary page on success.
   * Updates loginSuccessful flag on failure.
   */
  public async onLogin() {
    try {
      await this.authService.login(this.emailOrUsername, this.password);
      let username = this.authService.getUsername(this.emailOrUsername);
      if (!username || username === '') {
        username = this.emailOrUsername;
      }
      this.authService.UserLoggedIn = username;
      this.goToAnotherPage('/summary');
      localStorage.setItem('loggedIn', this.authService.UserLoggedIn);
    } catch (err: any) {
      this.loginSuccessfull = false;
    }
  }
showAnimation = true;
  ngOnInit(): void {
  if (localStorage.getItem('skipLoginAnimation') === 'true') {
    this.showAnimation = false;
    localStorage.removeItem('skipLoginAnimation'); // Nach Nutzung löschen
  }
}
}
