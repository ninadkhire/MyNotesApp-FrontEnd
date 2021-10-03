import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from '../note';

const API_URL = "http://localhost:8088/api/v1/notes";

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

export class NoteServiceStub{

  public SUCCESS_EXPECTED = 1;
  public FAILURE_EXPECTED = -1;

  getNotesList(){
    console.log(`NoteServiceStub got called`);
    return of([{
            "id": 1900,
            "title": "Sample Note 1",
            "note": "Note Content 1"
        },
        {
            "id": 1901,
            "title": "Sample Note 2",
            "note": "Note Content 2"
        }
      ]);
  }

  createNote(note: Note){
    return of({
      data: {
        "message": "Note stored at id 1900"
      }
    });
  }

  getNoteById(id: Number){
    return of({
      data: {
        "id": 1,
        "title": "Sample Note",
        "note": "Note Content"
      }
    });
  }

  updateNote(note: Note){
    return of({
      data: {
        "message": "User updated"
      }
    });
  }

  deleteNote(id: number){
    return of({
      data: {
        "message": "Deleted: 1900"
      }
    });
  }

}