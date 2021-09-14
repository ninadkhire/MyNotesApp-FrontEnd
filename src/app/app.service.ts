import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Note } from './note';
import { Credential } from './credential';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = "http://localhost:8080/api/notes";

  private authenticated = false;

  constructor(private httpClient: HttpClient) { }

  isUserAuthenticated() : boolean {
    return this.authenticated;
  }

  authenticate(credentials: Credential, callback: any){
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username+':'+credentials.password)
    } : {});

    this.httpClient.get(`${this.baseUrl}`, {headers: headers}).subscribe((response: any) => {
      if(response['name']){
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
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
