import { ThemingService } from './../../../../shared/services/theming/theming.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    themes: string[];
    changeThemeLabel = $localize`:@@toolbar.changeTheme:Change theme`;
    constructor(private theming: ThemingService) {}

    ngOnInit(): void {
        this.themes = this.theming.themes;
    }

    changeTheme(theme: string): void {
        this.theming.themeBS.next(theme);
    }
}
