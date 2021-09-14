import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Note } from '../note';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  note: Note = new Note();

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.note.userEmail="ninadkhire@gmail.com";
  }

  saveNote(){
    this.appService.createNote(this.note).subscribe(data => {
      console.log("Note added successfully");
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
