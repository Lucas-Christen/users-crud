import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snack = inject(MatSnackBar);
  return next(req).pipe(
    catchError(err => {
      // Mostra uma mensagem padrão caso o componente não tenha tratado
      snack.open('Falha na comunicação com o servidor.', 'Fechar', { duration: 3000 });
      return throwError(() => err);
    })
  );
};
