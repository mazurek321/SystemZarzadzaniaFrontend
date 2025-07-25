import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if(!auth.isLoggedIn()){
    router.navigate(['/auth/sign-in']);
    return false;
  }

  return true;
};
