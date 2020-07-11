import { AppSettingsService } from './shared/services/appSettings/app-service.service';
import { AudioService } from './shared/audio/audio.service';
import { SetGameOver } from './ngxs/actions/connect4.actions';
import { Connect4Service } from './modules/connect4/connect4.service';
import { StartNewGame } from './ngxs/actions/connect4.actions';
import { SetDarkMode } from './ngxs/actions/appSettings.actions';
import { ThemingService } from './shared/services/theming/theming.service';
import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';

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
            this.appSettingsService.setDarkmode(theme === 'dark-theme');
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
