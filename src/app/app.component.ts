import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';

import { Connect4Service } from './modules/connect4/connect4.service';
import { AudioService } from './shared/services/audio/audio.service';
import { AppSettingsService } from './shared/services/appSettings/app-service.service';
import { ThemingService } from './shared/services/theming/theming.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'connect4-angular';
    themingSubscription: Subscription;
    constructor(
        private store: Store,
        private themingService: ThemingService,
        private appSettingsService: AppSettingsService,
        private connect4Service: Connect4Service,
        private audioService: AudioService
    ) {}
    @HostBinding('class') public cssClass: string;

    ngOnInit(): void {
        this.themingSubscription = this.themingService.themeBS.subscribe((theme: string) => {
            this.cssClass = theme;
            this.appSettingsService.setDarkMode(theme === 'dark-theme');
        });
        this.connect4Service.diskAddedSubject.subscribe(() => {
            const gameFinishInfo = this.connect4Service.checkGameFinished();
            if (gameFinishInfo !== null) {
                this.connect4Service.gameFinish(gameFinishInfo);

                // play audio
                const hasIdentifiedWinner = gameFinishInfo.byPlayer !== null;
                this.audioService.playAudio(hasIdentifiedWinner ? 'victory' : 'noWinner');
            }
        });
        this.connect4Service.newGame();
    }

    ngOnDestroy(): void {
        this.themingSubscription.unsubscribe();
    }
}
