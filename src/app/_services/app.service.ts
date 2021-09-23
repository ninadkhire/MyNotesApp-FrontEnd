import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Note } from '../note';
import { Credential } from '../credential';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = "http://localhost:8080/api/notes";

  private apiUrl = "http://localhost:8080/api";

  private authenticated = false;

  private username = "Not logged in";

  private credentials: any;

  constructor(private httpClient: HttpClient, private router: Router) { }

  isUserAuthenticated() : boolean {
    return this.authenticated;
  }

  authenticate(credentials: Credential, callback: any){
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username+':'+credentials.password)
    } : {});

    this.httpClient.post(`${this.baseUrl}`, {headers: headers}, httpOptions).subscribe((response: any) => {
      if(response['name']){
        this.authenticated = true;

        this.credentials = credentials;
        this.username = credentials.username;

        this.router.navigateByUrl('/');
      } else {
        this.authenticated = false;

        alert("Authentication failed");
      }
      console.log("Authenticated : "+this.authenticated);
      return callback && callback();
    });
  }

  getNotesList(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${this.baseUrl}`);
  }

  createNote(note: Note): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, note);
  }

  getNoteById(id: number): Observable<Note> {
    return this.httpClient.get<Note>(`${this.baseUrl}/${id}`);
  }

  updateNote(id: number, note: Note): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, note);
  }

  deleteNote(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
