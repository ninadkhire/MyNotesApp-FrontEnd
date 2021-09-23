import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Note } from '../note';
import { NoteService } from '../_services/note.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  note: Note = new Note();

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    
  }

  saveNote(){
    this.noteService.createNote(this.note).subscribe(data => {
      console.log("Note added successfully. Data = "+data.toString());
      this.gotoNotesList();
    }, error => {
      console.log("Error while adding note to db "+error);
    });
  }

  gotoNotesList(){
    this.router.navigate(['/notes']);
  }

  onSubmit(){
    this.saveNote();
  }

}
