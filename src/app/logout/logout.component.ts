import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.logout();
  }

  logout(): void{
    this.tokenStorage.signOut();

    this.gotoHomePage();
  }

  gotoHomePage(){
    this.router.navigate(['']);
  }

}
