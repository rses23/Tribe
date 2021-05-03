import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages: any;
  currMessage = {username:"", text:"", likes:0};

  constructor(private firestore: AngularFirestore) {
     this.messages = firestore.collection<any>("messages").valueChanges();
  }

  ngOnInit() {
  }

  addMessage() {
  	var user1 = firebase.auth().currentUser;
  	this.currMessage.username = user1.displayName;
  	this.firestore.collection<any>("messages").add(this.currMessage);
  }

}
