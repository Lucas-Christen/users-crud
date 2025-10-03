import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { API_BASE_URL } from '../tokens/api-base-url.token';
import { User } from '../models/user.model';

describe('UsersService', () => {
  let svc: UsersService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
        UsersService
      ]
    });
    svc = TestBed.inject(UsersService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('list() deve fazer GET /api/users', () => {
    const mock: User[] = [{ id: 1, name: 'Ada', email: 'ada@lovelace.dev', age: 28 }];
    svc.list().subscribe(res => expect(res).toEqual(mock));
    const req = http.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('create() deve fazer POST /api/users', () => {
    const payload: User = { name: 'Linus', email: 'linus@x.org' };
    const returned: User = { id: 5, ...payload };
    svc.create(payload).subscribe(res => expect(res).toEqual(returned));
    const req = http.expectOne('/api/users');
    expect(req.request.method).toBe('POST');
    req.flush(returned);
  });

  it('update(id,payload) deve fazer PUT /api/users/:id', () => {
    const updated: User = { id: 1, name: 'Linus Torvalds', email: 'linus@kernel.org', age: 52 };
    svc.update(updated.id!, updated).subscribe(res => expect(res).toEqual(updated));
    const req = http.expectOne('/api/users/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updated);
  });

  it('update(user) (overload) deve fazer PUT /api/users/:id', () => {
    const updated: User = { id: 7, name: 'X', email: 'x@x.com', age: 20 };
    svc.update(updated).subscribe(res => expect(res).toEqual(updated));
    const req = http.expectOne('/api/users/7');
    expect(req.request.method).toBe('PUT');
    req.flush(updated);
  });

  it('delete() deve fazer DELETE /api/users/:id', () => {
    let called = false;
    svc.delete(1).subscribe(() => { called = true; });
    const req = http.expectOne('/api/users/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
    expect(called).toBeTrue();
  });

  // ---------- CENÁRIOS DE ERRO (Branches) ----------

  it('list() propaga erro 500', (done) => {
    svc.list().subscribe({
      next: () => fail('deveria falhar'),
      error: (err) => { expect(err.status).toBe(500); done(); }
    });
    const req = http.expectOne('/api/users');
    req.flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });
  });

  it('create() propaga erro 400 (validação)', (done) => {
    const payload: User = { name: 'X', email: 'inválido' as any };
    svc.create(payload).subscribe({
      next: () => fail('deveria falhar'),
      error: (err) => { expect(err.status).toBe(400); done(); }
    });
    const req = http.expectOne('/api/users');
    req.flush({ message: 'invalid email' }, { status: 400, statusText: 'Bad Request' });
  });

  it('update() propaga erro 404 (não encontrado)', (done) => {
    const updated: User = { id: 999, name: 'Ghost', email: 'ghost@x.org' };
    svc.update(updated.id!, updated).subscribe({
      next: () => fail('deveria falhar'),
      error: (err) => { expect(err.status).toBe(404); done(); }
    });
    const req = http.expectOne('/api/users/999');
    req.flush({ message: 'not found' }, { status: 404, statusText: 'Not Found' });
  });

  it('delete() propaga erro 500', (done) => {
    svc.delete(123).subscribe({
      next: () => fail('deveria falhar'),
      error: (err) => { expect(err.status).toBe(500); done(); }
    });
    const req = http.expectOne('/api/users/123');
    req.flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });
  });
});
