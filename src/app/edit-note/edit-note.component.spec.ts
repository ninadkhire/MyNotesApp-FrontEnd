import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { EditNoteComponent } from './edit-note.component';

describe('EditNoteComponent', () => {
  let component: EditNoteComponent;
  let fixture: ComponentFixture<EditNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ EditNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a heading', () => {
    const heading = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(heading.innerText).toBe('Edit Note');
  });

  it('"Update" button should be visible', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#positiveSubmitButton');
    expect(button.disabled).not.toBeTruthy();
  });

  it('should have label "Update" on submit button', () => {
    const button = fixture.debugElement.nativeElement.querySelector("#positiveSubmitButton");
    expect(button.innerText).toBe('Update');
  });
});
