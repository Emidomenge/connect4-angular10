import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AppState } from './../../../../ngxs';
import { AppSettingsService } from './../../../../shared/services/appSettings/app-service.service';
import { SidenavService } from './../../../../shared/services/sidenav/sidenav.service';
import { ThemingService } from './../../../../shared/services/theming/theming.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
    @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
    @Select((state: AppState) => state.appSettings.soundMute) isSoundMuted$: Observable<boolean>;
    @Select((state: AppState) => state.appSettings.darkModeEnabled) isDarkMode$: Observable<boolean>;

    showSoundMenu = false;
    showThemeMenu = false;
    showLanguageMenu = false;

    constructor(
        private sidenavService: SidenavService,
        private appSettingsService: AppSettingsService,
        private themingService: ThemingService
    ) {}

    ngOnInit(): void {
        this.sidenavService.setSidenav(this.sidenav);
    }

    public onClickRestartButton(): true {
        this.sidenavService.restartConnect4Game();
        return true;
    }

    public toggleSoundMenu(): void {
        this.showSoundMenu = !this.showSoundMenu;
    }

    public toggleThemeMenu(): void {
        this.showThemeMenu = !this.showThemeMenu;
    }

    public toggleLanguageMenu(): void {
        this.showLanguageMenu = !this.showLanguageMenu;
    }

    public setSoundMuteTo(value: boolean): boolean {
        this.appSettingsService.switchSoundToMute(value);
        return true;
    }

    public setDarkModeTo(value: boolean): boolean {
        this.themingService.themeBS.next(value ? 'dark-theme' : 'light-theme');
        return true;
    }
}
