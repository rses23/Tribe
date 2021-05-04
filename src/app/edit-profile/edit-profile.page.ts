import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  newProfileName: any;
  newPhotoURL: any;

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    let user = firebase.auth().currentUser;
    let newInfo = {
      displayName: this.newProfileName,
      photoURL: this.newPhotoURL
    }
    user.updateProfile(newInfo);
    this.router.navigate(['chat']);
  }

}
