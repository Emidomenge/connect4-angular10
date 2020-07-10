import { Injectable, ApplicationRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemingService {
    themes = ['dark-theme', 'light-theme'];
    themeBS = new BehaviorSubject('light-theme');
    constructor(private ref: ApplicationRef) {
        const darkModeOn = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (darkModeOn) {
            this.themeBS.next('dark-theme');
        }

        window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
            const turnOn = e.matches;
            this.themeBS.next(turnOn ? 'dark-theme' : 'light-theme');
            this.ref.tick();
        });
    }
}
