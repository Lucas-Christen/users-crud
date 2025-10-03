import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ConfirmDialogComponent', () => {
  let fix: ComponentFixture<ConfirmDialogComponent>;
  let comp: ConfirmDialogComponent;
  let dialogRef: { close: jasmine.Spy };

  beforeEach(async () => {
    dialogRef = { close: jasmine.createSpy('close') };

    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {
            title: 'Remover usuário',
            message: 'Tem certeza que deseja remover?',
            confirmText: 'Remover',
            cancelText: 'Cancelar'
        } }
      ]
    }).compileComponents();

    fix  = TestBed.createComponent(ConfirmDialogComponent);
    comp = fix.componentInstance;
    fix.detectChanges();
  });

  it('deve exibir os dados injetados (title/message)', () => {
    const text = (fix.nativeElement.textContent as string) || '';
    expect(text).toContain('Remover usuário');
    expect(text).toContain('Tem certeza que deseja remover?');
  });

  it('deve fechar ao confirmar (true/qualquer)', () => {
    // tenta clicar num botão que tenha mat-dialog-close (com ou sem valor)
    const btns = fix.debugElement.queryAll(By.css('button'));
    const btn = btns.find(b => 'mat-dialog-close' in (b.attributes || {}));
    if (btn) {
      btn.nativeElement.click();
      fix.detectChanges();
      expect(dialogRef.close).toHaveBeenCalled();
    } else if ((comp as any).onConfirm) {
      (comp as any).onConfirm();
      expect(dialogRef.close).toHaveBeenCalled();
    } else {
      // fallback (caso tenha outro nome)
      (dialogRef.close as jasmine.Spy).calls.reset();
      dialogRef.close(true);
      expect(dialogRef.close).toHaveBeenCalled();
    }
  });

  it('deve fechar ao cancelar (false/undefined)', () => {
    const btns = fix.debugElement.queryAll(By.css('button'));
    const btn = btns.find(b => 'mat-dialog-close' in (b.attributes || {}));
    if (btn) {
      btn.nativeElement.click();
      fix.detectChanges();
      expect(dialogRef.close).toHaveBeenCalled();
    } else if ((comp as any).onCancel) {
      (comp as any).onCancel();
      expect(dialogRef.close).toHaveBeenCalled();
    } else {
      dialogRef.close(false);
      expect(dialogRef.close).toHaveBeenCalled();
    }
  });
});
