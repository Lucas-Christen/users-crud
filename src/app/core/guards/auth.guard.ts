import { CanActivateFn } from '@angular/router';

// Exemplo simples: sempre permite. Substitua pela sua lógica (token, etc.)
export const authGuard: CanActivateFn = () => {
  // TODO: checar auth real (token, storage, chamada, etc.)
  return true;
};
