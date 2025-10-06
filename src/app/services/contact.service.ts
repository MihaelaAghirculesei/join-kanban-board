/**
 * Contact service for managing contact data
 * @fileoverview Provides functionality for CRUD operations on contacts
 * @module services/contact
 */
import { Injectable, OnDestroy, effect} from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot, addDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Contact } from '../interfaces/contact';
import { query, orderBy, limit } from 'firebase/firestore';
import { TaskService } from './task.service';
import { OverlayService } from './overlay.service';

/**
 * Contact service
 * @description Handles contact management operations and state
 * @implements {OnDestroy}
 */
@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnDestroy{
  /** Default contact data structure */
  contactData: {
    name: string;
    email: string;
    phone: string;
    letters?: string;
    color?: string;
  } = {
    name: '',
    email: '',
    phone: '',
    color: ''
  };
  
  /** Unsubscribe function for contact list listener */
  unsubContactList: any;
  
  /** Firestore database instance */
  firestore:Firestore = inject(Firestore);
  
  /** Task service injection */
  taskService = inject(TaskService);
  
  /** Overlay service injection */
  overlayService= inject(OverlayService);
  
  /** List of all contacts */
  contactList: Contact[] = [];
  
  /** Array storing contact list letter indices */
  contactListLetters: number[] = [];
  
  /** Array storing unique first letters of contact names */
  contactListLetter: string[] = [];
  
  /** Currently selected contact */
  currentContact: Contact = {name: '', email: '', phone: '', color: '', letters: '', selected: false};
  
  /** Index of current contact in contactList */
  currentIdex: number = 0;
  
  /** Display style for overlay */
  overlayDisplay: string = 'none';
  
  /** Current index in colors array */
  colorIndex: number = 0;
  
  /** Array of colors for contact avatars */
  colours: string[] = [
    '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD',
    '#2ECC71', '#E74C3C', '#3498DB', '#9B59B6', '#1ABC9C',
    '#D35400', '#34495E', '#27AE60', '#E67E22', '#2980B9',
    '#BDC3C7', '#7F8C8D', '#16A085', '#C0392B', '#F39C12',
    '#E84393', '#6C5CE7', '#00CEC9', '#FAB1A0', '#81ECEC',
    '#74B9FF', '#A29BFE', '#D63031', '#0984E3', '#636E72',
    '#55EFC4', '#FD79A8', '#FFEAA7', '#00B894', '#E17055',
    '#2D3436', '#6AB04C', '#F0932B', '#130F40', '#4834D4',
    '#22A6B3', '#BE2EDD', '#30336B', '#535C68', '#B33771',
    '#3B3B98', '#FD7272', '#58B19F', '#CAD3C8', '#BDC581'
  ];
  
  /** ID of the currently selected contact */
  selectedIndex: string | undefined = '';
  
  /**
   * Constructor for ContactService
   * @description Sets up initial state and listeners
   */
  constructor() {
    this.snap();
    this.checkContactListLetters();
    effect(() => {
      if (this.overlayService.setTemplate() === 'edit-task') {
        this.syncSelectedContacts();
      }
    });
  }
  
  /**
   * Gets first and last name from a full name
   * @param {string} name - Full name of contact
   * @returns {string} First and last name
   */
  getFirstAndLastName(name: string): string {
    if (!name) return '';
    const words = name.trim().split(/\s+/);
    if (words.length === 1) return words[0];
    return `${words[0]} ${words[words.length - 1]}`;
  }

  /**
   * Gets initials from first and last name
   * @param {string} name - Full name of contact
   * @returns {string} Initials of first and last name
   */
  getFirstAndLastNameFirstLetter(name: string): string {
    if (!name) return '';
    const words = name.trim().split(/\s+/);
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return `${words[0].charAt(0).toUpperCase()} ${words[words.length - 1].charAt(0).toUpperCase()}`;
  }

  /**
   * Sets up real-time listener for contacts collection
   * @description Updates contactList on changes
   */
  snap(){
    let q = query(this.getContactsRef(), orderBy('name'));
    this.unsubContactList = onSnapshot(q, (list)=>{
      this.contactList= [];
      list.forEach(element => {
          this.contactList.push(this.setContactObj(element.data(), element.id));
      })
      this.checkContactListLetters();
    });
  }

  /**
   * Updates the list of unique first letters in contact names
   * @description Used for alphabetical grouping of contacts
   */
  checkContactListLetters(){
    let letter = 0;
    this.contactListLetter= [];
    let condition = true;
    let startValue = 0;
    this.contactList.forEach(contact =>{
      while (condition) {
        if(contact.name.startsWith(String.fromCharCode(letter + 65))){
          if(!this.contactListLetter.includes(String.fromCharCode(letter + 65)))
          this.contactListLetter.push(String.fromCharCode(letter + 65))
          condition = false;
        }else{
          letter++;
        }

        if(letter == 26){
          condition = false;
        }
      }
      condition = true;
      letter = 0;
    });
  }

  /**
   * Cleanup on service destruction
   * @description Unsubscribes from Firestore listeners
   */
  ngOnDestroy(){
    if(this.unsubContactList()){
      this.unsubContactList();
    }
  }

  /**
   * Capitalizes first letter of each word in a string
   * @param {string} text - Text to capitalize
   * @returns {string} Capitalized text
   */
  capitalizeWords(text: string): string {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Adds a new contact to Firestore
   * @param {Object} item - Contact data
   * @returns {Promise<void>}
   */
  async addContact(item:{name: string,
    email: string,
    phone: string,
    letters?: string,
    color?: string,}){
    item.name = this.capitalizeWords(item.name);
    let newContactName = item.name;
    item.color = this.colours[this.contactList.length];
    this.colorIndex++;
    item.letters = this.getFirstAndLastNameFirstLetter(newContactName);
    await addDoc(this.getContactsRef(), item).catch(
      (err)=>{console.error(err)}
    ).then(
      (docRef)=>{}
    );
    this.checkContactListLetters();
    this.showNewContact(newContactName);
  }

  /**
   * Selects a newly created contact
   * @param {string} name - Name of the new contact
   */
  showNewContact(name: string){
    this.contactList.forEach((contact) => {
      if(contact.name === name ){
        this.selectItem(contact.id);
      }
    });
  }

  /**
   * Updates an existing contact
   * @param {Object} contactData - Updated contact data
   * @returns {Promise<void>}
   */
  async updateContact(contactData: {name: string;
    email: string;
    phone: string;
    letters?: string;
    color?: string;
  }){
    contactData.letters = this.getFirstAndLastNameFirstLetter(contactData.name)
    contactData.color = this.currentContact.color
    if(this.currentContact.id){
      await updateDoc(this.getSingleContact('contacts', this.currentContact.id), contactData);
      this.selectItem(this.currentContact.id);
    }
  }

  /**
   * Deletes the current contact
   * @returns {Promise<void>}
   */
  async deleteContact(){
    if(this.currentContact.id){
      await deleteDoc(this.getSingleContact('contacts', this.currentContact.id))
      this.selectItem('');
      this.overlayDisplay = 'none';
    }
  }

  /**
   * Creates a Contact object from Firestore data
   * @param {any} obj - Raw data from Firestore
   * @param {string} id - Document ID
   * @returns {Contact} Formatted contact object
   */
  setContactObj(obj: any, id: string):Contact{
    return {
      id: id,
      name: obj.name || '',
      email: obj.email || '',
      phone : obj.phone || '',
      color : obj.color || '',
      letters : obj.letters || '',
      selected : false
    }
  }

  /**
   * Gets reference to contacts collection
   * @returns {CollectionReference} Firestore collection reference
   */
  getContactsRef(){
    return collection(this.firestore, 'contacts');
  }

  /**
   * Gets reference to a specific document
   * @param {string} collectionRef - Collection name
   * @param {string} docId - Document ID
   * @returns {DocumentReference} Firestore document reference
   */
  getSingleContact(collectionRef: string, docId: string){
    return doc(collection(this.firestore, collectionRef), docId);
  }

  /**
   * Selects a contact by ID
   * @param {string | undefined} id - Contact ID
   */
  selectItem(id: string | undefined) {
    this.selectedIndex = id;
    this.contactList.forEach((contact, index) => {
      if(contact.id === id ){
        this.currentContact = contact;
        this.currentIdex = index;
      }
    });
    this.overlayDisplay = 'flex';
  }

  /**
   * Toggles selection state of a contact
   * @param {Contact} contact - Contact to toggle
   */
  setSelection(contact: Contact){
    contact.selected= !contact.selected
  }

  /**
   * Synchronizes contact selection with task assignment
   * @description Updates contact.selected based on task assignment
   */
  syncSelectedContacts() {
    const assigned = this.taskService.taskData.assignedTo;
    const allContacts = this.contactList;  
    allContacts.forEach(contact => {
      contact.selected = assigned!.some(a => a.id === contact.id);
    });      
  }
  
  /**
   * Handler for dropdown open event
   * @description Synchronizes contacts if in edit-task mode
   */
  onDropdownOpen() {
    if (this.overlayService.setTemplate() === 'edit-task') {
      this.syncSelectedContacts();
    }
  }
}