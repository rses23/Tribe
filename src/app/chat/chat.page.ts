import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages: any;

  constructor(private firestore: AngularFirestore) {
     this.messages = firestore.collection<any>("messages").valueChanges();
  }

  ngOnInit() {
  }

}
