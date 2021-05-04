import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Data } from '@angular/router';
import firebase from 'firebase/app';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  tribeNumber: any;
  messages: any;
  currMessage = {username:"", text:"", likes:0, tribeNumber: 0};

  constructor(private firestore: AngularFirestore, public ds: DataService) {
    this.messages = firestore.collection<any>("messages").valueChanges();
    this.tribeNumber = ds.currentTribeNumber;
  }

  ngOnInit() {
    console.log("This page thinks tribe number: ", this.tribeNumber);
  }

  addMessage() {
  	var user1 = firebase.auth().currentUser;
    this.currMessage.username = user1.displayName;
    this.currMessage.tribeNumber = this.tribeNumber;
  	this.firestore.collection<any>("messages").add(this.currMessage);
  }
}
