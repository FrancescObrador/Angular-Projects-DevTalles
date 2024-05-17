import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivate, CanMatch, MaybeAsync, GuardResult, Router, UrlSegment, Route, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {
    constructor( 
        private authService: AuthService,
        private router: Router,
    ) { }
    
    checkAuthStatus(): MaybeAsync<boolean>{
        return this.authService.checkAuthentication()
        .pipe(
            tap(isAuthenticated => {
                if(isAuthenticated){
                    this.router.navigate(['./'])
                }
            }),
            map(isAuthenticated => !isAuthenticated),
        )
    }

    canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
        return this.checkAuthStatus()
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.checkAuthStatus()
    }
    
}