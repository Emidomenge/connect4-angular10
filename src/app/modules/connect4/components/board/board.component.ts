import { BreakpointService } from './../../../../shared/services/breakpoint/breakpoint.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { AppState } from './../../../../ngxs';
import { PlayerIndex } from './../../../../ngxs/state/connect4.state';
import { connect4 } from './../../../../settings';
import { AudioService } from './../../../../shared/services/audio/audio.service';
import { Connect4Service } from './../../connect4.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
    nbColumn = connect4.nbColumns;
    nbRow = connect4.nbRows;
    rowHeight: string;
    i18nTest: string;
    isGameOver: boolean;
    constructor(
        private store: Store,
        private connect4Service: Connect4Service,
        private audioService: AudioService,
        private breakpointService: BreakpointService
    ) {}

    ngOnInit(): void {
        this.rowHeight = connect4.boardHeight.lg;
        this.detectBreakpoint();
        this.connect4Service.gameStatusSubject.subscribe(({ status }) => {
            this.isGameOver = status === 'gameOver';
        });
    }

    private detectBreakpoint(): void {
        const { boardHeight } = connect4;
        this.breakpointService.breakpointBS.subscribe((breakpoint) => {
            this.rowHeight = boardHeight[breakpoint];
        });
    }

    public onClickColumn(columnIndex: number): void {
        const { playerIndex, isGameOver } = this.store.selectSnapshot<{
            playerIndex: PlayerIndex | null;
            isGameOver: boolean;
        }>((state: AppState) => ({
            playerIndex: state.connect4.playerPlaying,
            isGameOver: state.connect4.gameOver
        }));
        if (!isGameOver) {
            this.connect4Service.addDiskInColumn(columnIndex, playerIndex);
        } else {
            this.audioService.playAudio('error');
        }
    }
}
