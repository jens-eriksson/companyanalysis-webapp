import { Component, OnInit } from '@angular/core';
import { AuthProvider } from './../../providers/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authProvider: AuthProvider,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.authProvider.signOut().then(() => this.router.navigate(["sign-in"]));
  }

  navigateHome() {
    this.router.navigate(["home"]);
  }

  getName(): string {
    if(this.authProvider.isAuthenticated()) {
      return this.authProvider.currentUser.name;
    }
    return "";
  }

  getPhotoUrl() {
    if(this.authProvider.isAuthenticated()) {
      return this.authProvider.currentUser.photoUrl;
    }
    return "";
  }

}