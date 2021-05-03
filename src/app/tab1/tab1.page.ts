import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
// TAB 1: Log in page at first, then chat page
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  messages: any;

  constructor(private firestore: AngularFirestore) {
     this.messages = firestore.collection<any>("messages").valueChanges();
  }

}
