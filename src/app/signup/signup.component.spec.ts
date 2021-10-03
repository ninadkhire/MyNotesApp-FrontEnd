import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display fields to get user input', () => {
    const f1 = fixture.debugElement.query(By.css('#username'));
    const f2 = fixture.debugElement.query(By.css('#email'));
    const f3 = fixture.debugElement.query(By.css('#password'));

    const sb1 = fixture.debugElement.query(By.css('#signupButton'));

    expect(f1).toBeTruthy();
    expect(f2).toBeTruthy();
    expect(f3).toBeTruthy();

    expect(sb1).toBeTruthy();
  });

  it('should display option to login instead signing up', () => {
    const sb2 = fixture.debugElement.query(By.css('#loginInsteadButton'));
    expect(sb2).toBeTruthy();
  });
});
