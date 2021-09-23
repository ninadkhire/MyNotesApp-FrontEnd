import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../note';
import { NoteService } from '../_services/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  note: Note = new Note();

  id: number;

  constructor(private noteService: NoteService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.noteService.getNoteById(this.id).subscribe(data => {
      this.note = data;
    }, error => console.log(error));
  }

  onUpdateClicked(){
    this.noteService.updateNote(this.note).subscribe(data => {
      console.log("Note updated. Data = "+data.toString());
      this.gotoNotesList();
    }, error => console.log(error));
  }

  onDeleteClicked(){
    if(confirm("Are you sure you want to delete this note? It cannot be undone.")){
      this.noteService.deleteNote(this.id).subscribe(data => {
        console.log("Note deleted. Data = "+data.toString());
        this.gotoNotesList();
      }, error => console.log(error));
    }
  }

  gotoNotesList(){
    this.router.navigate(['/notes']);
  }

}
