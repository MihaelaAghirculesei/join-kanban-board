import { Injectable, OnDestroy} from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot, addDoc} from '@angular/fire/firestore';
import { Contact } from '../interfaces/contact';
import { query, orderBy, limit } from 'firebase/firestore'; 


@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnDestroy{
  unsubContactList: any;
  firestore:Firestore = inject(Firestore);
  /* contacts  = collectionData(this.getContactsRef()); */
  contactList: Contact[] = [];
  contactListLaters: number[] = [];
  contactListLater: string[] = [];
  constructor() {
    this.snap();
    this.checkContactListLaters();
  }

  snap(){
    let q = query(this.getContactsRef(), orderBy('name'));
    this.unsubContactList = onSnapshot(q, (list)=>{
      this.contactList= [];
      list.forEach(element => {
          this.contactList.push(this.setContactObj(element.data(), element.id));
      })
      this.checkContactListLaters();
    });
  }

  checkContactListLaters(){
    let latter = 0;
    this.contactListLater= [];
    let condition = true;
    let startValue = 0;
    this.contactList.forEach(contact =>{
      while (condition) {
        if(contact.name.startsWith(String.fromCharCode(latter + 65))){
          if(!this.contactListLater.includes(String.fromCharCode(latter + 65)))
          this.contactListLater.push(String.fromCharCode(latter + 65))
          condition = false;
        }else{
          latter++;
        }

        if(latter == 26){
          condition = false;
        }
      }
      condition = true;
      latter = 0;
      console.log(this.contactListLater);
      
    });

  }

  ngOnDestroy(){
    if(this.unsubContactList()){
      this.unsubContactList();
    }
  }

  async addContact(item:any){
    await addDoc(this.getContactsRef(), item).catch(
      (err)=>{console.error(err)}
    ).then(
      (docRef)=>{ console.log("doc", docRef?.id);
      }
    );
    this.checkContactListLaters();
  }

  setContactObj(obj: any, id: string):Contact{
    return {
      id: id,
      name: obj.name || '',
      email: obj.email || '',
      phone : obj.phone || ''
    }
  }

  getContactsRef(){
    return collection(this.firestore, 'contacts');
  }

  getSingleContact(collectionRef: string, docId: string){
    return doc( collection(this.firestore, collectionRef), docId);
  }
}
