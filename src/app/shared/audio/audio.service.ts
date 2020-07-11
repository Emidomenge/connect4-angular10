import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    soundLibrary = {
        diskAdded: './../../../../../assets/audio/diskAdded.wav',
        columnFull: './../../../../../assets/audio/columnFull.wav'
    };
    constructor() {}

    public playAudio(soundTitle: 'diskAdded' | 'columnFull'): void {
        const audio = new Audio();
        audio.src = this.soundLibrary[soundTitle];
        audio.load();
        audio.play();
    }
}
