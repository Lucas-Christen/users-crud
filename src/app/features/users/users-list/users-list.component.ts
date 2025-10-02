import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../core/services/users.service';
import { User } from '../../../core/models/user.model';
import { MaterialImports } from '../../../material.imports';
import { UserFormComponent } from '../user-form/user-form.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, MaterialImports, UserFormComponent, ReactiveFormsModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  // CORREÇÃO: Adicionada a coluna 'age'
  displayedColumns = ['name', 'email', 'age', 'actions'];

  // datasource com sort/paginator/filter embutidos
  dataSource = new MatTableDataSource<User>([]);

  // busca
  search = new FormControl('');

  // estados
  creating = signal<boolean>(false);
  editingId = signal<number | null>(null);
  loading = signal<boolean>(false);

  // CORREÇÃO: Uso de setters para garantir que paginator e sort sejam atribuídos
  // assim que estiverem disponíveis no DOM, resolvendo o problema do *ngIf.
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  @ViewChild(MatSort) set sort(sort: MatSort) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;


  constructor(private api: UsersService, private toast: MatSnackBar) {
    // filtro por nome OU email
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const f = filter.trim().toLowerCase();
      return (
        data.name?.toLowerCase().includes(f) ||
        data.email?.toLowerCase().includes(f)
      );
    };
  }

  ngOnInit(): void {
    // reage ao campo de busca
    this.search.valueChanges.subscribe(v => {
      this.applyFilter(v);
    });
    this.load();
  }

  applyFilter(filterValue: string | null) {
    this.dataSource.filter = (filterValue || '').trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  load() {
    this.loading.set(true);
    this.api.list().subscribe({
      next: users => {
        this.dataSource.data = users;
        this.loading.set(false);
      },
      error: () => {
        this.toast.open('Falha ao carregar usuários', 'Fechar', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }

  startCreate() { this.creating.set(true); }
  cancelCreate() { this.creating.set(false); }

  createUser(user: User) {
    this.loading.set(true);
    this.api.create(user).subscribe({
      next: created => {
        this.dataSource.data = [created, ...this.dataSource.data];
        this.creating.set(false);
        this.loading.set(false);
        this.toast.open('Usuário criado', 'OK', { duration: 2000 });
      },
      error: () => {
        this.loading.set(false);
        this.toast.open('Erro ao criar usuário', 'Fechar', { duration: 3000 });
      }
    });
  }

  startEdit(id: number) { this.editingId.set(id); }
  cancelEdit() { this.editingId.set(null); }

  saveEdit(id: number, partial: User) {
    const original = this.dataSource.data.find(u => u.id === id);
    if (!original) return;

    const updated: User = { ...original, ...partial, id };
    this.loading.set(true);
    this.api.update(updated).subscribe({
      next: up => {
        this.dataSource.data = this.dataSource.data.map(u => u.id === id ? up : u);
        this.editingId.set(null);
        this.loading.set(false);
        this.toast.open('Usuário atualizado', 'OK', { duration: 2000 });
      },
      error: () => {
        this.loading.set(false);
        this.toast.open('Erro ao atualizar', 'Fechar', { duration: 3000 });
      }
    });
  }

  delete(id: number) {
    if (!confirm('Excluir este usuário?')) return;
    this.loading.set(true);
    this.api.delete(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);
        this.loading.set(false);
        this.toast.open('Usuário excluído', 'OK', { duration: 2000 });
      },
      error: () => {
        this.loading.set(false);
        this.toast.open('Erro ao excluir', 'Fechar', { duration: 3000 });
      }
    });
  }
}