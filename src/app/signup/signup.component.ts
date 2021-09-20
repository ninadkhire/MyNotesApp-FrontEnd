import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: any = {};

  credentials = {username: '', email: '', password: ''};

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signupClicked(){}

  loginClicked(){
    this.router.navigate(['login']);
  }

}
