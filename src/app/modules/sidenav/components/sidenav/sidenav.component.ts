import { SidenavService } from './../../../../shared/services/sidenav/sidenav.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
    @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
    constructor(private sidenavService: SidenavService) {}

    ngOnInit(): void {
        this.sidenavService.setSidenav(this.sidenav);
    }

    public onClickRestartButton(): true {
        this.sidenavService.restartConnect4Game();
        return true;
    }
}
