import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { UsersService } from '../../../core/services/users.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideZonelessChangeDetection } from '@angular/core';
import { API_BASE_URL } from '../../../core/tokens/api-base-url.token';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

describe('UsersListComponent (Extended Coverage)', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let service: UsersService;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const mockUsers = [
    { id: 1, name: 'Ada Lovelace', email: 'ada@test.com', age: 28 },
    { id: 2, name: 'Alan Turing', email: 'alan@test.com', age: 40 },
    { id: 3, name: 'Grace Hopper', email: 'grace@test.com' }
  ];

  beforeEach(async () => {
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [UsersListComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
        { provide: MatSnackBar, useValue: snackBarSpy },
        UsersService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UsersService);
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  describe('Inicialização', () => {
    it('deve chamar load() no ngOnInit', () => {
      spyOn(component, 'load');
      component.ngOnInit();
      expect(component.load).toHaveBeenCalled();
    });

    it('deve ter search form control configurado', () => {
      expect(component.search).toBeDefined();
      expect(component.search.value).toBe('');
    });
  });

  describe('Filtro', () => {
    beforeEach(() => {
      spyOn(service, 'list').and.returnValue(of(mockUsers));
      component.load();
      fixture.detectChanges();
    });

    it('deve filtrar por nome', () => {
      component.applyFilter('Ada');
      expect(component.dataSource.filteredData.length).toBe(1);
      expect(component.dataSource.filteredData[0].name).toBe('Ada Lovelace');
    });

    it('deve filtrar por email', () => {
      component.applyFilter('alan@');
      expect(component.dataSource.filteredData.length).toBe(1);
      expect(component.dataSource.filteredData[0].email).toBe('alan@test.com');
    });

    it('deve filtrar por idade', () => {
      component.applyFilter('28');
      expect(component.dataSource.filteredData.length).toBe(1);
      expect(component.dataSource.filteredData[0].age).toBe(28);
    });

    it('deve lidar com usuários sem idade', () => {
      component.applyFilter('Grace');
      expect(component.dataSource.filteredData.length).toBe(1);
      expect(component.dataSource.filteredData[0].age).toBeUndefined();
    });

    it('deve aceitar filtro null', () => {
      component.applyFilter(null);
      expect(component.dataSource.filter).toBe('');
    });

    it('deve filtrar case-insensitive', () => {
      component.applyFilter('ADA');
      expect(component.dataSource.filteredData.length).toBe(1);
    });
  });

  describe('CRUD Operations', () => {
    beforeEach(() => {
      spyOn(service, 'list').and.returnValue(of(mockUsers));
      component.load();
    });

    it('load() deve atualizar dataSource', () => {
      expect(component.dataSource.data.length).toBe(3);
      expect(component.dataSource.data[0].name).toBe('Ada Lovelace');
    });

    it('load() erro deve setar loading=false', () => {
      (service.list as jasmine.Spy).and.returnValue(throwError(() => new Error('API Error')));
      component.load();
      expect(component.loading()).toBe(false);
    });

    it('createUser() deve chamar service.create', () => {
      const newUser = { id: 4, name: 'New', email: 'new@test.com', age: 25 };
      const createSpy = spyOn(service, 'create').and.returnValue(of(newUser));
      
      component.createUser(newUser);
      
      expect(createSpy).toHaveBeenCalledWith(newUser);
    });

    it('saveEdit() deve chamar service.update', () => {
      const updated = { id: 1, name: 'Ada Updated', email: 'ada@new.com', age: 29 };
      const updateSpy = spyOn(service, 'update').and.returnValue(of(updated));
      
      component.saveEdit(1, { name: 'Ada Updated', email: 'ada@new.com', age: 29 });
      
      expect(updateSpy).toHaveBeenCalled();
    });

    it('saveEdit() não deve chamar service se usuário não existir', () => {
      const updateSpy = spyOn(service, 'update').and.returnValue(of({} as any));
      
      component.saveEdit(999, { name: 'Ghost', email: 'ghost@test.com' });
      
      expect(updateSpy).not.toHaveBeenCalled();
    });
  });

  describe('Estado de Edição', () => {
    beforeEach(() => {
      spyOn(service, 'list').and.returnValue(of(mockUsers));
      component.load();
    });

    it('startCreate() deve setar creating=true', () => {
      component.startCreate();
      expect(component.creating()).toBe(true);
    });

    it('cancelCreate() deve setar creating=false', () => {
      component.startCreate();
      component.cancelCreate();
      expect(component.creating()).toBe(false);
    });

    it('startEdit() deve setar editingId', () => {
      component.startEdit(1);
      expect(component.editingId()).toBe(1);
    });

    it('cancelEdit() deve limpar editingId', () => {
      component.startEdit(1);
      component.cancelEdit();
      expect(component.editingId()).toBeNull();
    });

    it('deve permitir apenas uma edição por vez', () => {
      component.startEdit(1);
      expect(component.editingId()).toBe(1);
      
      component.startEdit(2);
      expect(component.editingId()).toBe(2);
    });
  });

  describe('Delete com Dialog', () => {
    beforeEach(() => {
      spyOn(service, 'list').and.returnValue(of(mockUsers));
      component.load();
    });

    it('delete() deve abrir dialog', () => {
      const dialogSpy = spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(false)
      } as any);
      
      component.delete(1, 'Ada Lovelace');
      
      expect(dialogSpy).toHaveBeenCalled();
    });

    it('delete() cancelado não deve chamar service', () => {
      const deleteSpy = spyOn(service, 'delete').and.returnValue(of(void 0));
      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(false)
      } as any);
      
      component.delete(1, 'Ada Lovelace');
      
      expect(deleteSpy).not.toHaveBeenCalled();
    });

    it('delete() deve passar nome correto para dialog', () => {
      const dialogSpy = spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(false)
      } as any);
      
      component.delete(1, 'Ada Lovelace');
      
      const dialogArgs = dialogSpy.calls.mostRecent()?.args[1] as Partial<MatDialogConfig<{ message?: string }>> | undefined;
      expect(dialogArgs).toBeDefined();
      expect(dialogArgs?.data).toBeDefined();
      expect(dialogArgs?.data?.message).toContain('Ada Lovelace');
    });
  });

  describe('Limpeza', () => {
    it('ngOnDestroy deve completar destroy$', () => {
      spyOn(component['destroy$'], 'next');
      spyOn(component['destroy$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(component['destroy$'].next).toHaveBeenCalled();
      expect(component['destroy$'].complete).toHaveBeenCalled();
    });
  });

  describe('DataSource Configuration', () => {
    it('deve ter filterPredicate configurado', () => {
      expect(component.dataSource.filterPredicate).toBeDefined();
    });

    it('deve ter displayedColumns correto', () => {
      expect(component.displayedColumns).toEqual(['name', 'email', 'age', 'actions']);
    });
  });
});