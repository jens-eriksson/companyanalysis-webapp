import { AuthProvider } from './../../providers/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css']
})
export class SignInPage implements OnInit {

  message: string;

  constructor(
    private authProvider: AuthProvider,
    private router: Router
  ) {
  }

  ngOnInit() {
    console.log("SignInPage onInit");
  }

  signInWithGoogle() {
    this.authProvider.signInWithGoogle().then(user => {
      if (this.authProvider.isAuthorized()) {
        this.router.navigate(["home"]);
      }
      else {
        console.log("signInWithGoogle faild");
        this.authProvider.signOut();
        this.message = "Sorry. Du har inga rättighet";
      }
    });
  }

  signInWithFacebook() {
    this.authProvider.signInWithFacebook().then(user => {
      if (this.authProvider.isAuthorized()) {
        this.router.navigate(["home"]);
      }
      else {
        this.authProvider.signOut();
        this.message = "Sorry. Du har inga rättigheter";
      }
    });
  }

  navToAbout() {
    this.router.navigate(["about"]);
  }
}
