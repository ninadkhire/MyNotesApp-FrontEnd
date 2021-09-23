import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credential } from '../credential';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Credential = {username: '', password: ''};

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: String[] = [];

  error = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  login(): void{
    const { username, password } = this.credentials;

    this.authService.login(username, password).subscribe(
      data=>{
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err=>{
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  signupClicked(){
    this.router.navigate(['signup']);
  }

  reloadPage(): void {
    window.location.reload();
  }

}
