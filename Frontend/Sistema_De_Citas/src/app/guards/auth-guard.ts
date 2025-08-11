import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { Authservice } from '../services/authServices/authservice';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Authservice);
  const router = inject(Router);

   if (authService.isLoggedIn()) {
    return true; // ✅ Tiene token válido
  } else {
    router.navigate(['/login']); // 🔄 Redirige al login
    return false;
  }


};
