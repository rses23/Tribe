import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

/*

export interface User {
	uid: string;
	email: string;
}

export interface Message {
	username: string;
	text: string;
	likes: number;
	timestamp: any;	
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  	currentUser: User = null;
  	private messages: Observable<Message[]>;

  	constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
		this.afAuth.onAuthStateChanged((user) => {
			this.currentUser = user;
		})
		this.messages = this.afs.collection<Message>('messages').snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				})
			})
		)
	}

	async signup({email, password}):Promise<any> {
		const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);

		const uid = credential.user.uid;
	}

	signIn({email, password}) {
		return this.afAuth.signInWithEmailAndPassword(email, password);
	}

	signOut(): Promise<any> {
		return this.afAuth.signOut()
	}

	addChatMessage(msg) {
		return this.afs.collection('messages').add(msg);
	}

	getChatMessages() {
		let users = [];
		return this.afs.collection('messages');
	}
}
*/
