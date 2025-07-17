import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const estalogueado = await authService.esLogueado();

  if(estalogueado){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
