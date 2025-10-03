import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { httpErrorInterceptor } from './http-error.interceptor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideZonelessChangeDetection } from '@angular/core';

describe('httpErrorInterceptor', () => {
  let http: HttpTestingController;
  let snack: { open: jasmine.Spy };

  beforeEach(() => {
    snack = { open: jasmine.createSpy('open') };
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptors([httpErrorInterceptor])),
        provideHttpClientTesting(),
        { provide: MatSnackBar, useValue: snack }
      ]
    });
    http = TestBed.inject(HttpTestingController);
  });

  it('abre snackbar em 500', () => {
    const hc = TestBed.inject(HttpClient);
    hc.get('/api/users').subscribe({ error: () => {} });
    const req = http.expectOne('/api/users');
    req.flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });
    expect(snack.open).toHaveBeenCalled();
  });

  it('abre snackbar em 400', () => {
    const hc = TestBed.inject(HttpClient);
    hc.post('/api/users', {}).subscribe({ error: () => {} });
    const req = http.expectOne('/api/users');
    req.flush({ message: 'bad' }, { status: 400, statusText: 'Bad Request' });
    expect(snack.open).toHaveBeenCalled();
  });
});
