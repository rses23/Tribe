import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BooleanValueAccessor } from '@ionic/angular';

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
  constructor(private auth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.errored = false;
  }

  sortingHat() {
    this.firestore.collection<any>("tribes");
  }


  submit() {
    this.auth.createUserWithEmailAndPassword(this.username, this.password).then(user => {
      console.log(user.user.email, user.user.uid);
      this.errored = false;
      alert("Succesfully signed up!");
      user.user.updateProfile({
        displayName: this.displayName
      })
      this.router.navigate(['chat']);
    }).catch(error => {
      this.errored = true;
      this.router.navigate(['signup']);
      alert(error.message);
    });
  }
}
