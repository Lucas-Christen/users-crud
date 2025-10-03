import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UsersService } from '../../../core/services/users.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { API_BASE_URL } from '../../../core/tokens/api-base-url.token';

describe('UserFormComponent', () => {
  let comp: UserFormComponent;
  let fix: ComponentFixture<UserFormComponent>;
  let svc: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
        UsersService
      ]
    }).compileComponents();

    fix = TestBed.createComponent(UserFormComponent);
    comp = fix.componentInstance;
    svc = TestBed.inject(UsersService);
    fix.detectChanges();
  });

  function setForm(val: any) {
    comp.form.patchValue(val);
    comp.form.markAllAsTouched();
    fix.detectChanges();
  }

  it('onSubmit() inválido NÃO chama service', () => {
    spyOn(svc, 'create');
    spyOn(svc as any, 'update');

    setForm({ name: 'No', email: 'invalido', age: 17 }); // inválido
    comp.onSubmit();
    expect(svc.create).not.toHaveBeenCalled();
    expect((svc as any).update).not.toHaveBeenCalled();
  });

  it('onSubmit() válido mantém o formulário válido (form é responsabilidade do container chamar service)', () => {
    setForm({ name: 'Nome', email: 'n@n.com', age: 20 });
    comp.onSubmit();
    expect(comp.form.valid).toBeTrue();
    // se seu form emitir um evento de saída (ex.: saved), podemos cobrir isso depois
  });

  it('minAgeOrNull: aceita null e rejeita < 18', () => {
    const age = comp.form.get('age')!;
    age.setValue(null);  expect(age.valid).toBeTrue();
    age.setValue(17);    expect(age.valid).toBeFalse();
    age.setValue(18);    expect(age.valid).toBeTrue();
  });
});
