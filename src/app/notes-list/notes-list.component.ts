import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Note } from '../note';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  notes: Note[];

  isEmpty = true;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.getNotes();
  }

  private getNotes(){
    this.appService.getNotesList().subscribe(data => {
      this.notes = data;

      if(this.notes.length > 0){
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
      console.log(this.notes.length);
    });
  }

  deleteNote(id: number, i: number){
    if(confirm("Are you sure you want to delete the note \""+ this.notes[i].title +"\"?")){
      this.appService.deleteNote(id).subscribe(data => {
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

}
