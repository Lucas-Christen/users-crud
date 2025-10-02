import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserFormComponent', () => {
  let comp: UserFormComponent;
  let fix: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent, ReactiveFormsModule]
    }).compileComponents();

    fix = TestBed.createComponent(UserFormComponent);
    comp = fix.componentInstance;
    fix.detectChanges();
  });

  it('deve invalidar idade < 18', () => {
    comp.form.setValue({ name: 'Ana', email: 'ana@x.com', age: 17 });
    expect(comp.form.get('age')?.valid).toBeFalse();
  });

  it('deve aceitar idade vazia (opcional)', () => {
    comp.form.setValue({ name: 'Ana', email: 'ana@x.com', age: null });
    expect(comp.form.valid).toBeTrue();
  });

  it('deve invalidar email vazio', () => {
    comp.form.setValue({ name: 'Ana', email: '', age: 22 });
    expect(comp.form.get('email')?.valid).toBeFalse();
  });

  it('deve aceitar email válido', () => {
    comp.form.setValue({ name: 'Ana', email: 'ana@x.com', age: 22 });
    expect(comp.form.get('email')?.valid).toBeTrue();
  });
});
