import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyNotes';

  constructor(public tokenStorage: TokenStorageService, private router: Router){}
  
  ngOnInit(): void{
  }

  logout(): void{
    this.router.navigate(['logout']);
  }

  gotoHomePage(){
    this.router.navigate(['']);
  }
}
