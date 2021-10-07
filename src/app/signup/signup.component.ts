import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  //credentials = {username: '', email: '', password: ''};

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signupClicked(){
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe(
      data=>{
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

      },
      err=>{
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  loginClicked(){
    this.router.navigate(['login']);
  }

  gotoHomePage(){
    this.router.navigate(['']);
  }

}
