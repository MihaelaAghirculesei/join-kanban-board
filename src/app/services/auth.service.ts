/**
 * Authentication service for user management
 * @fileoverview Provides authentication functionality including login, registration, and logout
 * @module services/auth
 */
import { Injectable, inject } from '@angular/core';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AUTH, FIRESTORE } from '../firebase';
import { Router } from '@angular/router';
import { FeedbackServiceService } from './feedback.service';

/**
 * Authentication service
 * @description Handles user authentication operations
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Flag to indicate if email is already in use */
  emailAlreadyUsed: boolean = false;
  
  /** Current logged in user stored in local storage */
  UserLoggedIn: string|null = localStorage.getItem('loggedIn');
  
  /** Router injection */
  router= inject(Router);
  
  /** Feedback service injection */
  feedbackService= inject(FeedbackServiceService);
  
  /** Firebase Authentication instance */
  private auth = inject(AUTH);

  /** Cloud Firestore instance */
  private firestore = inject(FIRESTORE);

  /**
   * Login a user with email and password
   * @param email - User's email
   * @param password - User's password
   * @returns Firebase user credential promise
   */
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Reads the display name stored in the signed-in user's profile document
   * @param uid - Firebase user id
   * @returns The stored username, or an empty string if there is none
   */
  async getProfileName(uid: string): Promise<string> {
    const profile = await getDoc(doc(this.firestore, 'users', uid));
    return profile.exists() ? profile.data()['username'] ?? '' : '';
  }

  /**
   * Register a new user
   * @param email - User's email
   * @param password - User's password
   * @param username - User's username
   * @throws Error when registration fails
   */
  async register(email: string, password: string, username: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      await setDoc(doc(this.firestore, 'users', uid), {
        username: username,
        email: email,
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.emailAlreadyUsed = true;
      } else {
      }
      throw error;
    }
  }

  /**
   * Logout current user
   * @returns Firebase signOut promise
   */
  logout() {
    this.UserLoggedIn= '';
    this.router.navigate(['/login']);
    this.feedbackService.show('Log out successfull');
    localStorage.setItem('loggedIn', this.UserLoggedIn);
    return signOut(this.auth);
  }
}