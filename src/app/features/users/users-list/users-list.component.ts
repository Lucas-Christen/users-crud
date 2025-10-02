import { Component, OnInit, ViewChild, ElementRef, signal, OnDestroy } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, MaterialImports, UserFormComponent, ReactiveFormsModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'email', 'age', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  search = new FormControl('');

  creating = signal<boolean>(false);
  editingId = signal<number | null>(null);
  loading = signal<boolean>(false);

  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    if (paginator) { this.dataSource.paginator = paginator; }
  }
  @ViewChild(MatSort) set sort(sort: MatSort) {
    if (sort) { this.dataSource.sort = sort; }
  }
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private api: UsersService, private toast: MatSnackBar, public dialog: MatDialog) {
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const f = filter.trim().toLowerCase();
      const ageAsString = data.age ? data.age.toString() : '';

      return (
        data.name?.toLowerCase().includes(f) ||
        data.email?.toLowerCase().includes(f) ||
        ageAsString.includes(f)
      );
    };
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
      this.applyFilter(v);
    });
    this.load();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter(filterValue: string | null) {
    this.dataSource.filter = (filterValue || '').trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  load() {
    this.loading.set(true);
    this.api.list().pipe(takeUntil(this.destroy$)).subscribe({
      next: users => {
        this.dataSource.data = users;
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  startCreate() { this.creating.set(true); }
  cancelCreate() { this.creating.set(false); }

  createUser(user: User) {
    this.loading.set(true);
    this.api.create(user).pipe(takeUntil(this.destroy$)).subscribe({
      next: created => {
        this.dataSource.data = [created, ...this.dataSource.data];
        this.creating.set(false);
        this.toast.open('Usuário criado', 'OK', { duration: 2000 });
      },
      error: () => this.toast.open('Erro ao criar usuário', 'Fechar', { duration: 3000 }),
      complete: () => this.loading.set(false)
    });
  }

  startEdit(id: number) { this.editingId.set(id); }
  cancelEdit() { this.editingId.set(null); }
  
  saveEdit(id: number, partial: User) {
    const original = this.dataSource.data.find(u => u.id === id);
    if (!original) return;

    const updated: User = { ...original, ...partial, id };
    this.loading.set(true);
    this.api.update(updated).pipe(takeUntil(this.destroy$)).subscribe({
      next: up => {
        const index = this.dataSource.data.findIndex(u => u.id === id);
        const newData = [...this.dataSource.data];
        newData[index] = up;
        this.dataSource.data = newData;
        this.cancelEdit();
        this.toast.open('Usuário atualizado', 'OK', { duration: 2000 });
      },
      error: () => this.toast.open('Erro ao atualizar', 'Fechar', { duration: 3000 }),
      complete: () => this.loading.set(false)
    });
  }

  delete(id: number, name: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Exclusão',
        message: `Você tem certeza que deseja excluir o usuário "${name}"? Esta ação não pode ser desfeita.`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.loading.set(true);
        this.api.delete(id).pipe(takeUntil(this.destroy$)).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);
            this.toast.open('Usuário excluído com sucesso!', 'OK', { duration: 3000 });
          },
          error: () => this.toast.open('Erro ao excluir usuário.', 'Fechar', { duration: 3000 }),
          complete: () => this.loading.set(false)
        });
      }
    });
  }
}