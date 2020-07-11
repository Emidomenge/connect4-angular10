import { MatSidenav, MatDrawerToggleResult } from '@angular/material/sidenav';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {
    private sidenav: MatSidenav;
    constructor() {}

    public setSidenav(sidenav: MatSidenav): void {
        this.sidenav = sidenav;
    }

    public toggle(isOpen?: boolean): Promise<MatDrawerToggleResult> {
        return this.sidenav.toggle(isOpen);
    }
}
