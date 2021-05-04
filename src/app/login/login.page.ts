import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Data, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: any;
  password: any;
  users: any[];

  constructor(private auth: AngularFireAuth, private router: Router, private firestore: AngularFirestore, public ds: DataService) { }

  ngOnInit() {
    let users = [];
    let userInfo = {};
    this.firestore.collection<any>("users").snapshotChanges().subscribe(docs => {
      docs.forEach(user => {
        userInfo = {
          tribeNumber: user.payload.doc.data().tribeNumber,
          userID: user.payload.doc.data().userID
        }
        users.push(userInfo);
      })
    })
    this.users = users;
  }

  goToSignUp() {
    this.router.navigate(['signup']);
  }

  login() {
    this.auth.signInWithEmailAndPassword(this.username, this.password).then(user => {
      console.log(user.user.email, user.user.uid, "successfully logged in.");
      this.users.forEach(person => {
        if (person.userID == user.user.uid) {
          console.log("Users tribenumber found:", person.tribeNumber);
          this.ds.currentTribeNumber = person.tribeNumber;
        }
        this.router.navigate(['chat']);
      })
    }).catch(error => {
      alert(error.message);
    });
  }
}
