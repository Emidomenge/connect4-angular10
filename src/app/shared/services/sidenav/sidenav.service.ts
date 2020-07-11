import { StartNewGame } from './../../../ngxs/actions/connect4.actions';
import { Store } from '@ngxs/store';
import { MatSidenav, MatDrawerToggleResult } from '@angular/material/sidenav';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {
    private sidenav: MatSidenav;
    constructor(private store: Store) {}

    public setSidenav(sidenav: MatSidenav): void {
        this.sidenav = sidenav;
    }

    public toggle(isOpen?: boolean): Promise<MatDrawerToggleResult> {
        return this.sidenav.toggle(isOpen);
    }

    public restartConnect4Game(): void {
        this.store.dispatch(new StartNewGame());
    }
}
