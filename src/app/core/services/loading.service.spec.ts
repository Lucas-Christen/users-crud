import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(LoadingService);
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('start() deve setar isLoading=true na primeira chamada', () => {
    expect(service.isLoading()).toBe(false);
    service.start();
    expect(service.isLoading()).toBe(true);
  });

  it('start() múltiplas vezes mantém isLoading=true', () => {
    service.start();
    service.start();
    service.start();
    expect(service.isLoading()).toBe(true);
  });

  it('stop() só seta false quando count chega a 0', () => {
    service.start();
    service.start();
    expect(service.isLoading()).toBe(true);
    
    service.stop();
    expect(service.isLoading()).toBe(true); // ainda tem 1 pendente
    
    service.stop();
    expect(service.isLoading()).toBe(false); // agora zerou
  });

  it('stop() sem start não deixa count negativo', () => {
    service.stop();
    service.stop();
    expect(service.isLoading()).toBe(false);
  });

  it('reset() zera count e seta false', () => {
    service.start();
    service.start();
    expect(service.isLoading()).toBe(true);
    
    service.reset();
    expect(service.isLoading()).toBe(false);
    
    // após reset, novo start funciona normalmente
    service.start();
    expect(service.isLoading()).toBe(true);
  });
});