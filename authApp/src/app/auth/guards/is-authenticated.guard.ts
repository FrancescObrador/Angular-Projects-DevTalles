import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
 
  const authService = inject(AuthService)
  if(authService.authStatus() === AuthStatus.authenticated){
    return true
  }

  if(authService.authStatus() === AuthStatus.checking){
    return false
  }

  //const url = state.url
  //localStorage.setItem('path', url)
  
  const router = inject(Router)
  router.navigateByUrl('/auth/login')
  return false;
};
