import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NoteService, NoteServiceStub } from '../_services/note.service';

import { NotesListComponent } from './notes-list.component';

describe('NotesListComponent', () => {
  let component: NotesListComponent;
  let fixture: ComponentFixture<NotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ NotesListComponent ],
      providers: [{provide: NoteService, useClass: NoteServiceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a message if the list is empty', () => {
    const heading = fixture.debugElement.nativeElement.querySelector('#pListEmpty');
    if(component.notes.length == 0){
      expect(heading.innerText).toBe('The list is empty');
    } else {
      expect(heading).not.toBeTruthy();
    }
  });

  it('should display a button to create new note if the list is empty', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#createNewNoteButton');
    if(component.notes.length == 0){
      expect(button).toBeTruthy();
    } else {
      expect(button).not.toBeTruthy();
    }
  });

  it('should populate notes list', () => {
    expect(component.notes.length).toBeGreaterThan(0);
  });

  it('should call a method on NoteService to fetch notes', () => {
    spyOn(component.noteService, 'getNotesList').and.callThrough();
    component.ngOnInit();
    expect(component.noteService.getNotesList).toHaveBeenCalled();
  });

});
