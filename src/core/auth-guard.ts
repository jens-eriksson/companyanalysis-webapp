import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthProvider } from '../providers/auth';

@Injectable()
export class AccessGuardService implements CanActivate {
    
    constructor(
        public authProvider: AuthProvider,
        public router: Router
    ) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        let authenticated = this.authProvider.isAuthenticated();
        let authorized = this.authProvider.isAuthorized();

        if (authenticated && authorized) {
            return true;
        }
        else {
            this.router.navigate(['sign-in']);
            return false;
        }
    }

    
}