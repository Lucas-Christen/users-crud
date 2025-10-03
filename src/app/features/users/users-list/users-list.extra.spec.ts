import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { UsersService } from '../../../core/services/users.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaterialImports } from '../../../material.imports';
import { of, throwError } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { API_BASE_URL } from '../../../core/tokens/api-base-url.token';

describe('UsersListComponent (extra)', () => {
  let comp: UsersListComponent;
  let fix: ComponentFixture<UsersListComponent>;
  let svc: UsersService;

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

    fix = TestBed.createComponent(UsersListComponent);
    comp = fix.componentInstance;
    svc = TestBed.inject(UsersService);
  });

  it('filtra lista pelo termo de busca (via MatTableDataSource.filter)', () => {
    spyOn(svc, 'list').and.returnValue(of([
      { id: 1, name: 'Ada', email: 'ada@lovelace.dev', age: 28 },
      { id: 2, name: 'Alan', email: 'alan@turing.ai', age: 40 },
    ]));

    comp.load();
    fix.detectChanges();

    // força o filtro diretamente na datasource (independente de nome de método)
    (comp.dataSource as any).filter = 'alan';
    fix.detectChanges();

    const filtered = (comp.dataSource as any).filteredData ?? comp.dataSource.data;
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Alan');
  });

  it('trata erro ao listar (mantém data vazia)', () => {
    spyOn(svc, 'list').and.returnValue(throwError(() => ({ status: 500 })));

    comp.load();
    fix.detectChanges();

    expect(comp.dataSource.data.length).toBe(0);
  });
});
