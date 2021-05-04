import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Message } from '../modal/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages: any;
  currMessage:Message = {username:"", text:"", likes:0, timestamp:''};

  constructor(private firestore: AngularFirestore) {
     this.messages = firestore.collection<any>("messages").valueChanges();
  }

  ngOnInit() {
  }

  addMessage() {
  	var user1 = firebase.auth().currentUser;
  	this.currMessage.username = user1.displayName;
    this.currMessage.likes = 0;
    this.currMessage.timestamp = new Date().toISOString;
  	this.firestore.collection<any>("messages").add(this.currMessage);
  }


  like() {
    console.log("like was clicked");
  }
}
