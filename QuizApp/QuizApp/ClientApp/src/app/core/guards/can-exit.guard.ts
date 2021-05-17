import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';

import { Observable } from 'rxjs';

export interface CanExit {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanExitGuard implements CanDeactivate<CanExit> {
  constructor(private router: Router) { }

  canDeactivate(component: CanExit) {
    // gets nav object IF one exists
    let navObject = this.router.getCurrentNavigation()

    // bypass the form guard based on navigation state
    if (navObject && navObject.extras.state && navObject.extras.state.bypassFormGuard) {
      return true;
    }

    if (component.canDeactivate) {
      return component.canDeactivate();
    }
    return true;
  }
}
