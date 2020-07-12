import { AppSettingsService } from './../../services/appSettings/app-service.service';
import { AppState } from './../../../ngxs/index';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    soundLibrary = {
        diskAdded: 'assets/audio/diskAdded.wav',
        columnFull: 'assets/audio/error.wav',
        error: 'assets/audio/error.wav',
        victory: 'assets/audio/victory.wav',
        noWinner: 'assets/audio/noWinner.wav'
    };
    constructor(private store: Store, private appSettingsService: AppSettingsService) {
        const iOSDeviceDetected = /iPad|iPhone|iPod/.test(navigator.platform || '');
        if (iOSDeviceDetected) {
            // mute sound by default
            this.appSettingsService.switchSoundToMute(true);
        }
    }

    public playAudio(
        soundTitle: 'diskAdded' | 'columnFull' | 'noWinner' | 'victory' | 'error',
        delay: number = 0
    ): void {
        const isSoundMute = this.store.selectSnapshot<boolean>((state: AppState) => state.appSettings.soundMute);

        if (isSoundMute) {
            return;
        }

        const audio = new Audio();
        audio.src = this.soundLibrary[soundTitle];
        audio.load();
        setTimeout(() => audio.play(), delay);
    }
}
