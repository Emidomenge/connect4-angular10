import { Connect4Service } from './../../../modules/connect4/connect4.service';
import { StartNewGame } from './../../../ngxs/actions/connect4.actions';
import { Store } from '@ngxs/store';
import { MatSidenav, MatDrawerToggleResult } from '@angular/material/sidenav';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {
    private sidenav: MatSidenav;
    constructor(private store: Store, private connect4Service: Connect4Service) {}

    public setSidenav(sidenav: MatSidenav): void {
        this.sidenav = sidenav;
    }

    public toggle(isOpen?: boolean): Promise<MatDrawerToggleResult> {
        return this.sidenav.toggle(isOpen);
    }

    public restartConnect4Game(): void {
        this.connect4Service.newGame();
    }
}
