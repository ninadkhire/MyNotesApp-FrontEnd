import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CantLeftChangesUnsaved } from '../left-changes-unsaved.guard';
import { Note } from '../note';
import { NoteService } from '../_services/note.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit, CantLeftChangesUnsaved {
  
  note: Note = new Note();

  isModified = false;
  _canDeactivate = true;
  showCantDeactivateAlert = false;

  id: number;

  constructor(private noteService: NoteService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.noteService.getNoteById(this.id).subscribe(data => {
      this.note = data;
    }, error => console.log(error));
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
    this.isModified = true;
    this._canDeactivate = false;
  }

  onUpdateClicked(){
    this.noteService.updateNote(this.note).subscribe(data => {
      console.log("Note updated. Data = "+data.toString());
      this._canDeactivate = true;
      this.gotoNotesList();
    }, error => console.log(error));
  }

  onDiscardChangesClicked(){
    this._canDeactivate = true;
    this.gotoNotesList();
  }

  onDeleteClicked(){
    this.noteService.deleteNote(this.id).subscribe(data => {
      console.log("Note deleted. Data = "+data.toString());
      this._canDeactivate = true;
      this.gotoNotesList();
    }, error => console.log(error));
  }

  gotoNotesList(){
    this.router.navigate(['/notes']);
  }

}
