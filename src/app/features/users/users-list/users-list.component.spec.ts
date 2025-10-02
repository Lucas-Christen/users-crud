import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { UsersService } from '../../../core/services/users.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaterialImports } from '../../../material.imports';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('UsersListComponent', () => {
  let comp: UsersListComponent;
  let fix: ComponentFixture<UsersListComponent>;
  let userService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListComponent, MaterialImports],
      providers: [
        provideZonelessChangeDetection(),
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        UsersService
      ]
    }).compileComponents();

    fix = TestBed.createComponent(UsersListComponent);
    comp = fix.componentInstance;
    userService = TestBed.inject(UsersService);
  });

  it('deve listar usuários', () => {
    const mockUsers = [
      { id: 1, name: 'Ada', email: 'ada@lovelace.dev', age: 28 },
      { id: 2, name: 'Alan', email: 'alan@turing.ai', age: 40 },
    ];
    spyOn(userService, 'list').and.returnValue(of(mockUsers));

    comp.load();

    fix.detectChanges();
    expect(comp.dataSource.data.length).toBe(2);
    expect(comp.dataSource.data[0].name).toBe('Ada');
    expect(comp.dataSource.data[1].name).toBe('Alan');
  });

  it('deve criar usuário', () => {
    const newUser = { id: 3, name: 'Linus', email: 'linus@x.org', age: 52 };
    spyOn(userService, 'create').and.returnValue(of(newUser));

    comp.createUser(newUser);
    fix.detectChanges();
    expect(comp.dataSource.data[0].name).toBe('Linus');
  });
});