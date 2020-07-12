import { breakpoints } from './../../../../breakpoints/breakpoints';
import { AppState } from './../../../../ngxs/index';
import { AppSettingsService } from './../../../../shared/services/appSettings/app-service.service';
import { BreakpointService } from './../../../../shared/services/breakpoint/breakpoint.service';
import { SidenavService } from './../../../../shared/services/sidenav/sidenav.service';
import { ThemingService } from './../../../../shared/services/theming/theming.service';
import { Component, OnInit } from '@angular/core';
import { SupportedBreakpoints } from 'src/app/shared/services/breakpoint/breakpoint.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    themes: string[];
    breakpoint: SupportedBreakpoints;
    label = {
        changeTheme: $localize`:@@toolbar.changeTheme:Change theme`,
        muteSound: $localize`:@@toolbar.muteSound:Mute sound`,
        unmuteSound: $localize`:@@toolbar.unmuteSound:Unmute sound`,
        changeLanguage: $localize`:@@toolbar.changeLanguage:Change language`
    };
    @Select((state: AppState) => state.appSettings.soundMute) isSoundMuted$: Observable<boolean>;
    constructor(
        private theming: ThemingService,
        private sidenavService: SidenavService,
        private appSettingsService: AppSettingsService,
        private breakpointService: BreakpointService
    ) {}

    ngOnInit(): void {
        this.themes = this.theming.themes;
        this.breakpointService.breakpointBS.subscribe((breakpoint) => {
            this.breakpoint = breakpoint;
        });
    }

    public isPhoneDevice(): boolean {
        return this.breakpoint === 'xs' || this.breakpoint === 'xxs';
    }

    public changeTheme(theme: string): void {
        this.theming.themeBS.next(theme);
    }

    public muteSound(value: boolean): void {
        this.appSettingsService.switchSoundToMute(value);
    }

    public toggleSidenav(): void {
        this.sidenavService.toggle();
    }
}
