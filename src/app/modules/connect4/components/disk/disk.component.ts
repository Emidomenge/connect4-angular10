import { AudioService } from './../../../../shared/audio/audio.service';
import { Connect4Service } from './../../connect4.service';
import { PlayerIndex } from './../../../../ngxs/state/connect4.state';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-disk',
    templateUrl: './disk.component.html',
    styleUrls: ['./disk.component.scss']
})
export class DiskComponent implements OnInit {
    @Input() index: number;
    filledBy: PlayerIndex | null;
    constructor(private connect4Service: Connect4Service, private audioService: AudioService) {}

    ngOnInit(): void {
        this.resetDiskState();
        this.connect4Service.diskAddedSubject.subscribe(({ byPlayerIndex, slotFilled }) => {
            this.checkIfConcerned(slotFilled, byPlayerIndex);
        });

        this.connect4Service.gameStatusSubject.subscribe(({ status }) => {
            if (status === 'newGame') {
                this.resetDiskState();
            }
        });
    }

    private resetDiskState(): void {
        this.filledBy = null;
    }

    private checkIfConcerned(slotFilled: number, playerIndex: PlayerIndex): void {
        if (this.index === slotFilled) {
            this.filledBy = playerIndex;
            this.audioService.playAudio('diskAdded');
        }
    }
}
