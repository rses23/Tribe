import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: any;
  password: any;

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  goToSignUp() {
    this.router.navigate(['signup']);
  }

  login() {
    this.auth.signInWithEmailAndPassword(this.username, this.password).then(user => {
      console.log(user.user.email, user.user.uid, "successfully logged in.");
      this.router.navigate(['chat']);
    }).catch(error => {
      alert(error.message);
    });
  }

}
