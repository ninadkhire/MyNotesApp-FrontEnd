import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeftChangesUnsavedGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: CantLeftChangesUnsaved,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
  
}

export interface CantLeftChangesUnsaved {
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}
