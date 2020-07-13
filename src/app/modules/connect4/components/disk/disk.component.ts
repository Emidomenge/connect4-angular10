import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { AppState } from './../../../../ngxs';
import { PlayerIndex } from './../../../../ngxs/state/connect4.state';
import { AudioService } from './../../../../shared/services/audio/audio.service';
import { Connect4Service } from './../../connect4.service';

@Component({
    selector: 'app-disk',
    templateUrl: './disk.component.html',
    styleUrls: ['./disk.component.scss']
})
export class DiskComponent implements OnInit {
    @Input() index: number;
    filledBy: PlayerIndex | null;
    isMatchingWinCondition: boolean;
    constructor(private connect4Service: Connect4Service, private audioService: AudioService, private store: Store) {}

    ngOnInit(): void {
        this.resetDiskState();
        this.connect4Service.diskAddedSubject.subscribe(({ byPlayerIndex, slotFilled }) => {
            this.checkIfConcerned(slotFilled, byPlayerIndex);
        });

        this.connect4Service.gameStatusSubject.subscribe(({ status }) => {
            if (status === 'newGame') {
                this.resetDiskState();
            } else if (status === 'gameOver') {
                this.checkIfMatchingWinCondition();
            }
        });
    }

    private resetDiskState(): void {
        this.filledBy = null;
        this.isMatchingWinCondition = false;
    }

    private checkIfConcerned(slotFilled: number, playerIndex: PlayerIndex): void {
        if (this.index === slotFilled) {
            this.filledBy = playerIndex;
            this.audioService.playAudio('diskAdded', 220);
        }
    }

    private checkIfMatchingWinCondition(): void {
        const winConditionResolved = this.store.selectSnapshot<number[]>(
            (state: AppState) => state.connect4.winConditionResolved
        );
        this.isMatchingWinCondition = winConditionResolved !== null && winConditionResolved.includes(this.index);
    }
}
