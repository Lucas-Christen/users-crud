import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { User } from '../../core/models/user.model';
import { provideZonelessChangeDetection } from '@angular/core';

describe('UsersService', () => {
  let svc: UsersService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        UsersService
      ]
    });
    
    svc = TestBed.inject(UsersService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('list() deve fazer GET /api/users', () => {
    const mock: User[] = [{ id: 1, name: 'Ada', email: 'ada@lovelace.dev', age: 28 }];
    svc.list().subscribe((res: User[]) => expect(res).toEqual(mock));

    const req = http.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('create() deve fazer POST /api/users', () => {
    const payload: User = { name: 'Linus', email: 'linus@x.org' };
    const returned: User = { id: 5, ...payload };
    svc.create(payload).subscribe((res: User) => expect(res).toEqual(returned));

    const req = http.expectOne('/api/users');
    expect(req.request.method).toBe('POST');
    req.flush(returned);
  });

  it('update() deve fazer PUT /api/users/:id', () => {
    const updated: User = { id: 1, name: 'Linus Torvalds', email: 'linus@kernel.org', age: 52 };
    svc.update(updated).subscribe((res: User) => expect(res).toEqual(updated));

    const req = http.expectOne('/api/users/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updated);
  });

  it('delete() deve fazer DELETE /api/users/:id', () => {
    svc.delete(1).subscribe((res: any) => expect(res).toBeTruthy());

    const req = http.expectOne('/api/users/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});