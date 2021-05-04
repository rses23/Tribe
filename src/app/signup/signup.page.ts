import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: any;
  password: any;
  displayName: any;
  errored: boolean;
  tribes: any;

  chanceOfExistingTribe = 9; // 0 for 10%, 1 for 20%, up to 9 for 100%; the complement is chance of new tribe selection

  constructor(private auth: AngularFireAuth, private router: Router, private firestore: AngularFirestore, public ds: DataService) { }

  ngOnInit() {
    this.errored = false;
    let tribes = [];
    this.firestore.collection<any>("tribes").snapshotChanges().subscribe(docs => {
      docs.forEach(tribe => {
        let tribeInfo = {
          tribeNumber: tribe.payload.doc.data().tribeNumber,
          userCount: tribe.payload.doc.data().userCount,
          docID: tribe.payload.doc.id
        }
        tribes.push(tribeInfo);
      })
    })
    this.tribes = tribes;
  }

  sortingHat() {
    let numOfTribes = this.tribes.length;
    if (numOfTribes == 1) {
      console.log("User goes in tribe 1.");
      let updatedTribeInfo = {
        tribeNumber: this.tribes[0].tribeNumber,
        userCount: this.tribes[0].userCount + 1
      }
      this.firestore.doc<any>("tribes/" + this.tribes[0].docID).update(updatedTribeInfo);
      // create user doc and update their tribe
      this.auth.currentUser.then(user => {
        let newUserInfo = {
          userID: user.uid,
          tribeNumber: this.tribes[0].tribeNumber
        }
        this.firestore.collection<any>("users").ref.add(newUserInfo);
      })
      return this.tribes[0].tribeNumber;
    }
    else {
      let roll = Math.floor(Math.random() * 10); // if 0, goes into existing tribes, if not goes into empty
      if (roll <= this.chanceOfExistingTribe) {
        let tribeIndex = Math.floor(Math.random() * numOfTribes);
        console.log("tribenum: ", tribeIndex);
        let tribe = this.tribes[tribeIndex];
        console.log("User is joining tribe: ", tribe.tribeNumber);
        let updatedTribeInfo = {
          tribeNumber: this.tribes[tribeIndex].tribeNumber,
          userCount: this.tribes[tribeIndex].userCount + 1
        }
        this.firestore.doc<any>("tribes/" + this.tribes[tribeIndex].docID).update(updatedTribeInfo);
        this.auth.currentUser.then(user => {
          let newUserInfo = {
            userID: user.uid,
            tribeNumber: this.tribes[tribeIndex].tribeNumber
          }
          this.firestore.collection<any>("users").ref.add(newUserInfo);
        })
        return this.tribes[tribeIndex].tribeNumber;
      } else {
        console.log("User goes into new tribe.");
        let tribeIndex = numOfTribes - 1;
        console.log("tribenum: ", tribeIndex);
        let tribe = this.tribes[tribeIndex];
        console.log("User is joining tribe: ", tribe.tribeNumber);
        let updatedTribeInfo = {
          tribeNumber: this.tribes[tribeIndex].tribeNumber,
          userCount: this.tribes[tribeIndex].userCount + 1
        }
        this.firestore.doc<any>("tribes/" + this.tribes[tribeIndex].docID).update(updatedTribeInfo);
        this.auth.currentUser.then(user => {
          let newUserInfo = {
            userID: user.uid,
            tribeNumber: this.tribes[tribeIndex].tribeNumber
          }
          this.firestore.collection<any>("users").ref.add(newUserInfo);
        })
        return this.tribes[tribeIndex].tribeNumber;
      }
    }
  }


  submit() {
    this.auth.createUserWithEmailAndPassword(this.username, this.password).then(user => {
      console.log(user.user.email, user.user.uid);
      this.errored = false;
      alert("Succesfully signed up!");
      user.user.updateProfile({
        displayName: this.displayName
      })
      let num = this.sortingHat();
      alert("You were sorted into tribe " + num + "!");
      this.ds.currentTribeNumber = num;
      this.router.navigate(['chat']);
    }).catch(error => {
      this.errored = true;
      this.router.navigate(['signup']);
      alert(error.message);
    });
  }
}
