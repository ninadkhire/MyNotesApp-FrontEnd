import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateNoteComponent } from './create-note.component';

describe('CreateNoteComponent', () => {
  let component: CreateNoteComponent;
  let fixture: ComponentFixture<CreateNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ CreateNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a heading', () => {
    const heading = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(heading.innerText).toBe('Create New Note');
  });

  it('"Create" button should be visible', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#positiveSubmitButton');
    expect(button.disabled).not.toBeTruthy();
  });

  it('should have label "Create" on submit button', () => {
    const button = fixture.debugElement.nativeElement.querySelector("#positiveSubmitButton");
    expect(button.innerText).toBe('Create');
  });
});
