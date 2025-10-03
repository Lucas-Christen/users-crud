import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../tokens/api-base-url.token';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private apiBaseUrl: string
  ) {}

  private url(path: string = ''): string {
    return `${this.apiBaseUrl.replace(/\/$/, '')}/users${path}`;
  }

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.url());
  }

  create(payload: User): Observable<User> {
    return this.http.post<User>(this.url(), payload);
  }

  // ── OVERLOADS: aceita update(user) OU update(id, payload) ───────────────────
  update(user: User): Observable<User>;
  update(id: number | string, payload: User): Observable<User>;
  update(arg1: User | number | string, arg2?: User): Observable<User> {
    if (typeof arg1 === 'object') {
      const u = arg1 as User;
      if (u?.id == null) {
        throw new Error('UsersService.update(user): "user.id" é obrigatório.');
      }
      return this.http.put<User>(this.url(`/${u.id}`), u);
    } else {
      const id = arg1 as number | string;
      const payload = arg2 as User;
      return this.http.put<User>(this.url(`/${id}`), payload);
    }
  }
  // ────────────────────────────────────────────────────────────────────────────

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(this.url(`/${id}`));
  }
}
