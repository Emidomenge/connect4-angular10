import { AudioService } from './../../shared/audio/audio.service';
import { UpdateBoard } from './../../ngxs/actions/connect4.actions';
import { connect4 } from './../../settings/index';
import { AppState } from './../../ngxs/index';
import { PlayerIndex, Connect4Board } from './../../ngxs/state/connect4.state';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngxs/store';

export type DiskAddedSubject = { slotFilled: number; byPlayerIndex: PlayerIndex };

@Injectable({
    providedIn: 'root'
})
export class Connect4Service {
    diskAddedSubject: Subject<DiskAddedSubject> = new Subject();
    constructor(private store: Store, private audioService: AudioService) {}

    public addDiskInColumn(columnIndex: number, playerIndex: PlayerIndex): null | number {
        const board = this.store.selectSnapshot<Connect4Board>((state: AppState) => state.connect4.currentBoard);
        let availableSlotIndex = null;
        const { nbColumns } = connect4;

        // find an available slot in the selected column
        board.forEach((element, index) => {
            const isSlotEmpty = element === null;
            const slotFound = availableSlotIndex !== null;
            if (index % nbColumns === columnIndex % nbColumns && isSlotEmpty && !slotFound) {
                availableSlotIndex = index;
            }
        });

        if (availableSlotIndex !== null) {
            // update store
            this.store.dispatch(new UpdateBoard(availableSlotIndex, playerIndex));
            // emit event
            this.diskAddedSubject.next({ slotFilled: availableSlotIndex, byPlayerIndex: playerIndex });
        } else {
            this.audioService.playAudio('columnFull');
        }

        return availableSlotIndex;
    }
}
