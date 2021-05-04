import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Data } from '@angular/router';
import firebase from 'firebase/app';

import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  tribeNumber: any;
  messages: any;
  currMessage = { username: "", text: "", likes: 0, tribeNumber: 0, messageID: 0 };
  currentMsgNum: any;
  

  constructor(private firestore: AngularFirestore, public ds: DataService, private router: Router) {
      this.messages = firestore.collection<any>("messages").valueChanges();
      this.tribeNumber = ds.currentTribeNumber;
      var db = firebase.firestore();
      let temp1 = Array<any>();
      this.messages = this.firestore.collection<any>("messages").valueChanges();
     
      let result = db.collection('messages').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              temp1.push(doc.data());
          })
          var i, j;
          for(i = 0; i < temp1.length-1; i++) {
              var minIndex = i;
              for(j = i+1; j < temp1.length; j++) {
                  if(temp1[j].timestamp < temp1[minIndex].timestamp)
                      minIndex = j;
              }
              var temp = temp1[minIndex];
              temp1[minIndex] = temp1[i];
              temp1[i] = temp;
          }
          for(i = 0; i < temp1.length; i++)
              console.log(temp1[i].text + " ts: " + temp1[i].timestamp);
      });
  }

  ngOnInit() {
    // UNDEFINED ERROR?
    this.getHighestMsgNum();
    console.log("Current msg num: ", this.currentMsgNum);
  }

  getHighestMsgNum() {
    let highestNum = 0;
    this.firestore.collection<any>("messages").snapshotChanges().subscribe(docs => {
      docs.forEach(message => {
        if (message.payload.doc.data().messageID > highestNum) {
          highestNum = message.payload.doc.data().messageID;
          console.log("Highest num is ", highestNum);
        }
      })
      this.currentMsgNum = highestNum + 1;
    })
  }

  addMessage() {
    // we will use the getTime() method to represent the timestamp, this method
    // returns the number of milliseconds since Jan 1 1970, so the bigger the number, the more recent the message
    var today = new Date();

  	var user1 = firebase.auth().currentUser;
    this.currMessage.username = user1.displayName;
    this.currMessage.tribeNumber = this.tribeNumber;
    this.currMessage.messageID = this.currentMsgNum;
    this.getHighestMsgNum();
  	this.firestore.collection<any>("messages").add(this.currMessage);
  }

  // NONFUNCTIONAL
  like(currentMessage: any) {
    let id = currentMessage.messageID;
    console.log("Current message id is ", id)
  }

  editProfile() {
    this.router.navigate(['edit-profile']);

  }

}
