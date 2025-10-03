import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { loadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../services/loading.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('loadingInterceptor', () => {
  let http: HttpTestingController;
  let loading: { start: jasmine.Spy; stop: jasmine.Spy };

  beforeEach(() => {
    loading = { start: jasmine.createSpy('start'), stop: jasmine.createSpy('stop') };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptors([loadingInterceptor])),
        provideHttpClientTesting(),
        { provide: LoadingService, useValue: loading }
      ]
    });

    http = TestBed.inject(HttpTestingController);
  });

  it('chama start() e depois stop() em sucesso', () => {
    const hc = TestBed.inject(HttpClient);
    hc.get('/api/users').subscribe();
    const req = http.expectOne('/api/users');
    expect(loading.start).toHaveBeenCalledTimes(1);
    req.flush([]);
    expect(loading.stop).toHaveBeenCalledTimes(1);
  });

  it('chama stop() mesmo em erro', () => {
    const hc = TestBed.inject(HttpClient);
    hc.get('/api/users').subscribe({ error: () => {} });
    const req = http.expectOne('/api/users');
    req.flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });
    expect(loading.stop).toHaveBeenCalledTimes(1);
  });
});
