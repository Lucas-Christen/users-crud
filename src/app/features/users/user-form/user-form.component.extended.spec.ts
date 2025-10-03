import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideZonelessChangeDetection } from '@angular/core';
import { SimpleChange } from '@angular/core';

describe('UserFormComponent (Extended Coverage)', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnChanges', () => {
    it('deve resetar form quando initialValue muda', () => {
      const user = { id: 1, name: 'Ada', email: 'ada@test.com', age: 30 };
      
      component.initialValue = user;
      component.ngOnChanges({
        initialValue: new SimpleChange(null, user, false)
      });
      
      expect(component.form.value.name).toBe('Ada');
      expect(component.form.value.email).toBe('ada@test.com');
      expect(component.form.value.age).toBe(30);
    });

    it('deve tratar age=null corretamente', () => {
      const user = { id: 1, name: 'Test', email: 'test@test.com', age: undefined };
      
      component.initialValue = user;
      component.ngOnChanges({
        initialValue: new SimpleChange(null, user, false)
      });
      
      expect(component.form.value.age).toBeNull();
    });

    it('não deve resetar se initialValue não mudou', () => {
      spyOn(component.form, 'reset');
      
      component.ngOnChanges({});
      
      expect(component.form.reset).not.toHaveBeenCalled();
    });
  });

  describe('Validações', () => {
    it('nome: deve rejeitar menos de 3 caracteres', () => {
      const nameControl = component.form.get('name')!;
      
      nameControl.setValue('Ab');
      expect(nameControl.hasError('minlength')).toBe(true);
      
      nameControl.setValue('Abc');
      expect(nameControl.hasError('minlength')).toBe(false);
    });

    it('email: deve rejeitar formato inválido', () => {
      const emailControl = component.form.get('email')!;
      
      emailControl.setValue('invalido');
      expect(emailControl.hasError('email')).toBe(true);
      
      emailControl.setValue('valido@email.com');
      expect(emailControl.hasError('email')).toBe(false);
    });

    it('age: deve aceitar vazio/null', () => {
      const ageControl = component.form.get('age')!;
      
      ageControl.setValue(null);
      expect(ageControl.valid).toBe(true);
      
      ageControl.setValue('');
      expect(ageControl.valid).toBe(true);
      
      ageControl.setValue(undefined);
      expect(ageControl.valid).toBe(true);
    });

    it('age: deve rejeitar < 18', () => {
      const ageControl = component.form.get('age')!;
      
      ageControl.setValue(17);
      expect(ageControl.hasError('minAge')).toBe(true);
      
      ageControl.setValue(18);
      expect(ageControl.hasError('minAge')).toBe(false);
    });
  });

  describe('onSubmit', () => {
    it('deve emitir submitForm com valores válidos', () => {
      spyOn(component.submitForm, 'emit');
      
      component.form.patchValue({
        name: 'Test User',
        email: 'test@example.com',
        age: 25
      });
      
      component.onSubmit();
      
      expect(component.submitForm.emit).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        age: 25
      });
    });

    it('deve marcar todos touched se inválido', () => {
      component.form.patchValue({
        name: 'A',
        email: 'invalid',
        age: 10
      });
      
      spyOn(component.form, 'markAllAsTouched');
      component.onSubmit();
      
      expect(component.form.markAllAsTouched).toHaveBeenCalled();
    });

    it('não deve emitir se form inválido', () => {
      spyOn(component.submitForm, 'emit');
      
      component.form.patchValue({
        name: '',
        email: 'invalid'
      });
      
      component.onSubmit();
      
      expect(component.submitForm.emit).not.toHaveBeenCalled();
    });
  });

  describe('Eventos de saída', () => {
    it('deve emitir cancel ao clicar cancelar', () => {
      spyOn(component.cancel, 'emit');
      
      const cancelButton = fixture.nativeElement.querySelector('button[type="button"]');
      cancelButton.click();
      
      expect(component.cancel.emit).toHaveBeenCalled();
    });
  });

  describe('Estado do botão Salvar', () => {
    it('deve estar desabilitado com form inválido', () => {
      component.form.patchValue({
        name: 'A',
        email: 'invalid'
      });
      fixture.detectChanges();
      
      const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(submitButton.disabled).toBe(true);
    });

    it('deve estar habilitado com form válido', () => {
      component.form.patchValue({
        name: 'Valid Name',
        email: 'valid@email.com',
        age: 20
      });
      fixture.detectChanges();
      
      const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(submitButton.disabled).toBe(false);
    });
  });
});