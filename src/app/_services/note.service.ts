import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../note';

const API_URL = "http://localhost:8080/api/v1/notes";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getNotesList(): Observable<Note[]>{
    return this.http.get<Note[]>(API_URL);
  }

  createNote(note: Note): Observable<Object>{
    return this.http.post(API_URL, note);
  }

  getNoteById(id: number): Observable<Note>{
    return this.http.get<Note>(API_URL+`/${id}`);
  }

  updateNote(note: Note): Observable<Object>{
    return this.http.put(API_URL, note);
  }

  deleteNote(id: number): Observable<Object>{
    return this.http.delete(API_URL+`/${id}`);
  }

}
