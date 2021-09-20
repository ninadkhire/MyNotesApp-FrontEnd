import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Credential } from '../credential';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Credential = {username: '', password: ''};

  error = false;

  //for form validation
  form: any = {};

  constructor(private appService: AppService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    try{
      console.log("username="+this.form.username);
      console.log("password="+this.form.password);

      this.appService.authenticate(this.credentials, ()=>{
        //
      });
    } catch(e){
      this.error = true;
    }
    return false;
  }

  signupClicked(){
    this.router.navigate(['signup']);
  }

}
