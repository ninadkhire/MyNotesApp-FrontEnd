import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../note';
import { NoteService } from '../_services/note.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  notes: Note[];

  isEmpty = true;

  constructor(public tokenStorage: TokenStorageService, private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    this.getNotes();
  }

  private getNotes(){
    this.noteService.getNotesList().subscribe(data => {
      this.notes = data;

      if(this.notes.length > 0){
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
      console.log("Notes Length = "+this.notes.length);
    });
  }

  deleteNote(id: number, i: number){
    if(confirm("Are you sure you want to delete the note \""+ this.notes[i].title +"\"?")){
      this.noteService.deleteNote(id).subscribe(data => {
        console.log("Note deleted. Data = "+data.toString());
        this.getNotes();
      });
    }
  }

  editNote(id: number){
    this.router.navigate(['edit-note', id]);
  }

  gotoCreateNewNote(){
    this.router.navigate(['/create-note']);
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }

}
