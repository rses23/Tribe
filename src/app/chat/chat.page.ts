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
