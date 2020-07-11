import { AudioService } from './../../../../shared/audio/audio.service';
import { AppState } from './../../../../ngxs/index';
import { Connect4Service } from './../../connect4.service';
import { PlayerIndex } from './../../../../ngxs/state/connect4.state';
import { breakpoints } from './../../../../breakpoints/breakpoints';
import { connect4 } from './../../../../settings/index';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Store } from '@ngxs/store';

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
    constructor(
        private store: Store,
        private breakpointObserver: BreakpointObserver,
        private connect4Service: Connect4Service,
        private audioService: AudioService
    ) {}

    ngOnInit(): void {
        this.rowHeight = connect4.boardHeight.lg;
        this.detectBreakpoint();
    }

    private detectBreakpoint(): void {
        const { boardHeight } = connect4;
        const applyRowHeight = (rowHeightValue: string, result: BreakpointState) => {
            if (result.matches) {
                this.rowHeight = rowHeightValue;
            }
        };
        this.breakpointObserver
            .observe([`(max-width: ${breakpoints.screen_xs_min}px)`])
            .subscribe((result) => applyRowHeight('40vh', result));
        this.breakpointObserver
            .observe([`(max-width: ${breakpoints.screen_md_min}px)`])
            .subscribe((result) => applyRowHeight(boardHeight.xs, result));
        this.breakpointObserver
            .observe([`(max-width: ${breakpoints.screen_lg_min}px)`])
            .subscribe((result) => applyRowHeight(boardHeight.md, result));
        this.breakpointObserver
            .observe([`(min-width: ${breakpoints.screen_xs_min}px)`])
            .subscribe((result) => applyRowHeight(boardHeight.xs, result));
        this.breakpointObserver
            .observe([`(min-width: ${breakpoints.screen_md_min}px)`])
            .subscribe((result) => applyRowHeight(boardHeight.md, result));
        this.breakpointObserver
            .observe([`(min-width: ${breakpoints.screen_lg_min}px)`])
            .subscribe((result) => applyRowHeight(boardHeight.lg, result));
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
