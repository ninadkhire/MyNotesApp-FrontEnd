import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'poc-my-notes-app-frontend';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorage: TokenStorageService, private router: Router){}
  
  ngOnInit(): void{
    this.updateLoginStatus();
  }

  logout(): void{
    this.tokenStorage.signOut();
    //window.location.reload();

    this.updateLoginStatus();
    
    console.log("Logout clicked. isLoggedIn: "+this.isLoggedIn);

    this.gotoHomePage();
  }

  updateLoginStatus(){
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    console.log("updateLoginStatus() called.");
  }

  gotoHomePage(){
    this.router.navigate(['/notes']);
  }
}
