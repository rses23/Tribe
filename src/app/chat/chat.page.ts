import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Message } from '../modal/Message';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages: any;
  currMessage:Message = {username:"", text:"", likes:0, timestamp:0};

  constructor(private firestore: AngularFirestore) {
     this.messages = this.firestore.collection<any>("messages").valueChanges();
     console.log(this.messages);

  }

  ngOnInit() {
  }

  addMessage() {
    // we will use the getTime() method to represent the timestamp, this method
    // returns the number of milliseconds since Jan 1 1970, so the bigger the number, the more recent the message
    var today = new Date();

  	var user1 = firebase.auth().currentUser;
  	this.currMessage.username = user1.displayName;
    this.currMessage.likes = 0;
    this.currMessage.timestamp = today.getTime();
  	this.firestore.collection<any>("messages").add(this.currMessage);
  }


  like() {
    console.log("like was clicked");
  }
}
