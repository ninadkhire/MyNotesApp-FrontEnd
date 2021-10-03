import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a heading', () => {
    const heading = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(heading.innerText).toBe('Login');
  });

  it('"Login" button should be visible', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#positiveSubmitButton');
    expect(button.disabled).not.toBeTruthy();
  });

  it('should have label "Login" on submit button', () => {
    const button = fixture.debugElement.nativeElement.querySelector("#positiveSubmitButton");
    expect(button.innerText).toBe('Login');
  });
});
