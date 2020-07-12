import { AudioService } from './../../shared/services/audio/audio.service';
import { UpdateBoard, SetGameOver, StartNewGame } from './../../ngxs/actions/connect4.actions';
import { connect4 } from './../../settings/index';
import { AppState } from './../../ngxs/index';
import { PlayerIndex, Connect4Board, GameOverInfo } from './../../ngxs/state/connect4.state';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngxs/store';

export type DiskAddedSubject = { slotFilled: number; byPlayerIndex: PlayerIndex };
export type GameStatusSubject = { status: 'gameOver' | 'newGame' };

@Injectable({
    providedIn: 'root'
})
export class Connect4Service {
    diskAddedSubject: Subject<DiskAddedSubject> = new Subject(); // trigger when a disk is added
    gameStatusSubject: Subject<GameStatusSubject> = new Subject(); // trigger when game finished or start
    constructor(private store: Store, private audioService: AudioService) {}

    public gameFinish(gameFinishInfo: GameOverInfo): void {
        this.store.dispatch(new SetGameOver(gameFinishInfo.byPlayer, gameFinishInfo.winConditionResolved));
        this.gameStatusSubject.next({ status: 'gameOver' });
    }

    public newGame(): void {
        this.store.dispatch(new StartNewGame());
        this.gameStatusSubject.next({ status: 'newGame' });
    }

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

    public checkGameFinished(): null | GameOverInfo {
        const winningArrays = [
            [0, 1, 2, 3],
            [41, 40, 39, 38],
            [7, 8, 9, 10],
            [34, 33, 32, 31],
            [14, 15, 16, 17],
            [27, 26, 25, 24],
            [21, 22, 23, 24],
            [20, 19, 18, 17],
            [28, 29, 30, 31],
            [13, 12, 11, 10],
            [35, 36, 37, 38],
            [6, 5, 4, 3],
            [0, 7, 14, 21],
            [41, 34, 27, 20],
            [1, 8, 15, 22],
            [40, 33, 26, 19],
            [2, 9, 16, 23],
            [39, 32, 25, 18],
            [3, 10, 17, 24],
            [38, 31, 24, 17],
            [4, 11, 18, 25],
            [37, 30, 23, 16],
            [5, 12, 19, 26],
            [36, 29, 22, 15],
            [6, 13, 20, 27],
            [35, 28, 21, 14],
            [0, 8, 16, 24],
            [41, 33, 25, 17],
            [7, 15, 23, 31],
            [34, 26, 18, 10],
            [14, 22, 30, 38],
            [27, 19, 11, 3],
            [35, 29, 23, 17],
            [6, 12, 18, 24],
            [28, 22, 16, 10],
            [13, 19, 25, 31],
            [21, 15, 9, 3],
            [20, 26, 32, 38],
            [36, 30, 24, 18],
            [5, 11, 17, 23],
            [37, 31, 25, 19],
            [4, 10, 16, 22],
            [2, 10, 18, 26],
            [39, 31, 23, 15],
            [1, 9, 17, 25],
            [40, 32, 24, 16],
            [9, 7, 25, 33],
            [8, 16, 24, 32],
            [11, 7, 23, 29],
            [12, 18, 24, 30],
            [1, 2, 3, 4],
            [5, 4, 3, 2],
            [8, 9, 10, 11],
            [12, 11, 10, 9],
            [15, 16, 17, 18],
            [19, 18, 17, 16],
            [22, 23, 24, 25],
            [26, 25, 24, 23],
            [29, 30, 31, 32],
            [33, 32, 31, 30],
            [36, 37, 38, 39],
            [40, 39, 38, 37],
            [7, 14, 21, 28],
            [8, 15, 22, 29],
            [9, 16, 23, 30],
            [10, 17, 24, 31],
            [11, 18, 25, 32],
            [12, 19, 26, 33],
            [13, 20, 27, 34]
        ];

        const boardSnapshot = this.store.selectSnapshot<Connect4Board>(
            (state: AppState) => state.connect4.currentBoard
        );
        const result = winningArrays.filter((winArr) => {
            return (
                boardSnapshot[winArr[0]] !== null &&
                boardSnapshot[winArr[0]] === boardSnapshot[winArr[1]] &&
                boardSnapshot[winArr[0]] === boardSnapshot[winArr[2]] &&
                boardSnapshot[winArr[0]] === boardSnapshot[winArr[3]]
            );
        });
        const isBoardFullOfDisks = boardSnapshot.filter((disk) => disk === null).length === 0;

        if (isBoardFullOfDisks) {
            return {
                winConditionResolved: null,
                byPlayer: null
            };
        }

        return result.length > 0
            ? { winConditionResolved: result[0], byPlayer: boardSnapshot[result[0][0]] as 1 | 2 }
            : null;
    }
}
