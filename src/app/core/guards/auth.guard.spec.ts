import { authGuard } from './auth.guard';

describe('authGuard', () => {
  it('retorna true na configuração atual', (done) => {
    const result = authGuard({} as any, {} as any);
    // pode ser booleano simples ou Observable<boolean|UrlTree>
    if ((result as any)?.subscribe) {
      (result as any).subscribe((can: boolean) => { expect(can).toBeTrue(); done(); });
    } else {
      expect(result).toBeTrue();
      done();
    }
  });
});
