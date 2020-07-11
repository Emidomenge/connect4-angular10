import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    soundLibrary = {
        diskAdded: './../../../../../assets/audio/diskAdded.wav',
        columnFull: './../../../../../assets/audio/error.wav',
        error: './../../../../../assets/audio/error.wav',
        victory: './../../../../../assets/audio/victory.wav',
        noWinner: './../../../../../assets/audio/noWinner.wav'
    };
    constructor() {}

    public playAudio(soundTitle: 'diskAdded' | 'columnFull' | 'noWinner' | 'victory' | 'error'): void {
        const audio = new Audio();
        audio.src = this.soundLibrary[soundTitle];
        audio.load();
        audio.play();
    }
}
