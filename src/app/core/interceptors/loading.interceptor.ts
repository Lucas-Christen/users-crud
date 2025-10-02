import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoadingService);

  if (req.url.includes('/assets/') || req.method === 'OPTIONS') return next(req);

  loader.start();
  return next(req).pipe(finalize(() => loader.stop()));
};
