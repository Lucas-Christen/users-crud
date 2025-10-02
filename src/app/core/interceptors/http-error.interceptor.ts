import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snack = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let msg = 'Falha na comunicação. Tente novamente.';
      if (err.status === 0) msg = 'Sem conexão com o servidor.';
      else if (err.status >= 500) msg = 'Erro no servidor. Tente mais tarde.';
      else if (err.status === 404) msg = 'Recurso não encontrado.';
      else if (err.status === 400) msg = 'Requisição inválida.';
      snack.open(msg, 'Fechar', { duration: 3000 });
      return throwError(() => err);
    })
  );
};
