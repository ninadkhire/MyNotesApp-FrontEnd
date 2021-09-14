import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { Note } from '../note';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  note: Note = new Note();

  id: number;

  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.appService.getNoteById(this.id).subscribe(data => {
      this.note = data;
    }, error => console.log(error));
  }

  onSubmit(){
    this.appService.updateNote(this.id, this.note).subscribe(data => {
      this.gotoNotesList();
    }, error => console.log(error));
  }

  gotoNotesList(){
    this.router.navigate(['/notes']);
  }

}
