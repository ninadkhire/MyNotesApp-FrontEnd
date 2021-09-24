import { Injectable } from '@angular/core';

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private roles: string[] = [];
  private _isLoggedIn = false;
  private showAdminBoard = false;
  private showModeratorBoard = false;
  private _username?: string;

  constructor() { }

  signOut(): void{
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any{
    const user = window.sessionStorage.getItem(USER_KEY);

    if(user){
      return JSON.parse(user);
    }

    return {};
  }

  updateLoginStatus(){
    this._isLoggedIn = !!this.getToken();

    if (this._isLoggedIn) {
      const user = this.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this._username = user.username;
    }

  }

  isLoggedIn(){
    this.updateLoginStatus();

    return this._isLoggedIn;
  }

  getUsername(){
    this.updateLoginStatus();

    return this._username;
  }
}
