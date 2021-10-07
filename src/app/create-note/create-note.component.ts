import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CantLeftChangesUnsaved } from '../left-changes-unsaved.guard';

import { Note } from '../note';
import { NoteService } from '../_services/note.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit, CantLeftChangesUnsaved {

  note: Note = new Note();

  _canDeactivate = true;
  showCantDeactivateAlert = false;

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean>{
    console.log(`canDeactivate fired! value = ${this._canDeactivate}`);

    if(!this._canDeactivate){
      this.showCantDeactivateAlert = true;
    } else {
      this.showCantDeactivateAlert = false;
    }

    return this._canDeactivate;
  }

  onModified(){
    this._canDeactivate = false;
  }

  saveNote(){
    this.noteService.createNote(this.note).subscribe(data => {
      console.log("Note added successfully. Data = "+data.toString());
      this._canDeactivate = true;
      this.gotoNotesList();
    }, error => {
      console.log("Error while adding note to db "+error);
    });
  }

  discardNote(){
    this._canDeactivate = true;
    this.gotoNotesList();
  }

  gotoNotesList(){
    this.router.navigate(['/notes']);
  }

  onSubmit(){
    this.saveNote();
  }

}
