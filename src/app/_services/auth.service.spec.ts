import { getTestBed, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const AUTH_API = 'http://localhost:8088/api/auth/';

  const dummySigninRequest = {
    "username": "admin",
    "password": "123456"
  };

  const dummySigninReqResponse = {
    "id": 3,
    "username": "admin",
    "email": "admin@mynoteapp.com",
    "roles": [
        "ROLE_USER",
        "ROLE_ADMIN",
        "ROLE_MODERATOR"
    ],
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzMzI2NDAyMywiZXhwIjoxNjMzMzUwNDIzfQ.7f7ECuSbEyOl8o7X-pr47syjay6rPFIvx0i0Tt9orSomTfHGoXtWkloOojSQ0EiuO7FsT2ucy1VHEJ0ZhfQzDA",
    "tokenType": "Bearer"
  };

  const dummySignupRequest = {
    "username": "dummy_user",
    "email": "dummy_user@mynotesapp.com",
    "password": "123456"
  };

  const dummySignupReqResponse = {
    "message": "Dummy Message!"
  };

  it('login() should return data', ()=>{
    service.login('dummy', 'password').subscribe((res)=>{
      expect(res).toEqual(dummySigninReqResponse);
    });

    const req = httpMock.expectOne(AUTH_API+"signin");
    expect(req.request.method).toBe('POST');
    req.flush(dummySigninReqResponse);
  });

  it('register() should return data', ()=>{
    service.register("dummy_user", "dummy_user@mynotesapp.com", "123456").subscribe((res)=>{
      expect(res).toEqual(dummySignupReqResponse);
    });

    const req = httpMock.expectOne(AUTH_API+"signup");
    expect(req.request.method).toBe('POST');
    req.flush(dummySignupReqResponse);
  });

});
