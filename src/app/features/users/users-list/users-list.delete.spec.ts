import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { UsersService } from '../../../core/services/users.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaterialImports } from '../../../material.imports';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { API_BASE_URL } from '../../../core/tokens/api-base-url.token';
import { By } from '@angular/platform-browser';

describe('UsersListComponent (delete confirm flow via DOM)', () => {
  let comp: UsersListComponent;
  let fix: ComponentFixture<UsersListComponent>;
  let svc: UsersService;

  const users = [
    { id: 1, name: 'Ada',  email: 'ada@lovelace.dev', age: 28 },
    { id: 2, name: 'Alan', email: 'alan@turing.ai',   age: 40 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListComponent, MaterialImports],
      providers: [
        provideZonelessChangeDetection(),
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
        UsersService
      ]
    }).compileComponents();

    fix  = TestBed.createComponent(UsersListComponent);
    comp = fix.componentInstance;
    svc  = TestBed.inject(UsersService);

    spyOn(svc, 'list').and.returnValue(of(users));
    comp.load();
    fix.detectChanges();
  });

  function getDeleteButtons(): HTMLButtonElement[] {
    // procura botões que contenham ícone/texto "delete"
    const icons = fix.debugElement.queryAll(
      By.css('button mat-icon, button .material-symbols-outlined, button .material-icons, button')
    );
    return icons
      .filter(d => (d.nativeElement.textContent || '').toLowerCase().includes('delete'))
      .map(d => (d.nativeElement.tagName.toLowerCase() === 'button'
        ? d.nativeElement
        : d.parent?.nativeElement) as HTMLButtonElement)
      .filter(Boolean);
  }

  it('deve excluir quando o usuário CONFIRMA no diálogo (clique no botão)', () => {
    // fake dialog que CONFIRMA
    const fakeDialogYes = { afterClosed: () => of(true) };
    // força o componente a usar o fake
    (comp as any).dialog = { open: jasmine.createSpy('open').and.returnValue(fakeDialogYes) };

    spyOn(svc, 'delete').and.returnValue(of(void 0)); // delete(): Observable<void>

    const delButtons = getDeleteButtons();
    expect(delButtons.length).toBeGreaterThan(0);

    delButtons[0].click();  // dispara o método delete() do componente
    fix.detectChanges();

    expect((comp as any).dialog.open).toHaveBeenCalled();
    expect(svc.delete).toHaveBeenCalledOnceWith(1);  // id=1
  });

  it('NÃO deve excluir quando o usuário CANCELA no diálogo (clique no botão)', () => {
    // fake dialog que CANCELA
    const fakeDialogNo = { afterClosed: () => of(false) };
    (comp as any).dialog = { open: jasmine.createSpy('open').and.returnValue(fakeDialogNo) };

    const deleteSpy = spyOn(svc, 'delete').and.returnValue(of(void 0));

    const delButtons = getDeleteButtons();
    expect(delButtons.length).toBeGreaterThan(0);

    delButtons[0].click();
    fix.detectChanges();

    expect((comp as any).dialog.open).toHaveBeenCalled();
    expect(deleteSpy).not.toHaveBeenCalled();
  });
});
