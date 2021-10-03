import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';

describe('NoteService', () => {
  let service: NoteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NoteService]
    });

    service = TestBed.inject(NoteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const dummyNotesList = [{
        "id": 1900,
        "title": "Sample Note 1",
        "note": "Note Content 1"
    },
    {
        "id": 1901,
        "title": "Sample Note 2",
        "note": "Note Content 2"
    }
  ];

  const dummyNote = {
    "id": 1,
    "title": "Sample Note",
    "note": "Note Content"
  };

  const dummyResponse = {
    "message": "Sample Message"
  };

  const BASE_URL = "http://localhost:8088/api/v1/notes";

  it('getNotesList() should work', ()=>{
    service.getNotesList().subscribe((res) => {
      expect(res).toEqual(dummyNotesList);
    });

    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyNotesList);
  });

  it('insert should work', ()=>{
    service.createNote(dummyNote).subscribe((res)=>{
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('update should work', ()=>{
    service.updateNote(dummyNote).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyResponse);
  });

  it('delete should work', ()=>{
    service.deleteNote(1900).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(BASE_URL+"/1900");
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });
});
