import { Connect4Service } from './../../connect4.service';
import { AppState } from './../../../../ngxs/index';
import { Store } from '@ngxs/store';
import { PlayerIndex } from './../../../../ngxs/state/connect4.state';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-banner-info',
    templateUrl: './banner-info.component.html',
    styleUrls: ['./banner-info.component.scss']
})
export class BannerInfoComponent implements OnInit {
    translations = {
        player1: $localize`:@@notificationInfo.player1:Player 1`,
        player2: $localize`:@@notificationInfo.player2:Player 2`,
        yourTurn: $localize`:@@notificationInfo.yourTurn:your turn !`,
        wins: $localize`:@@notificationInfo.wins:wins !`,
        noWinner: $localize`:@@notificationInfo.noWinner:No winner !`,
        gameOver: $localize`:@@notificationInfo.gameOver:Game over.`,
        draw: $localize`:@@notificationInfo.gameOver:Draw.`
    };
    playerNameLabel: string | null;
    playerStatusLabel: string | null;
    gameOverLabel: string | null;
    playingPlayerIndex: PlayerIndex | null;
    isGameOver: boolean;
    constructor(private store: Store, private connect4Service: Connect4Service) {}

    ngOnInit(): void {
        this.connect4Service.diskAddedSubject.subscribe(({ byPlayerIndex }) => {
            if (!this.isGameOver) {
                const nextPlayer = byPlayerIndex === 1 ? 2 : 1;
                this.updatePlayerSection(nextPlayer);
            }
        });
        this.connect4Service.gameStatusSubject.subscribe(({ status }) => {
            if (status === 'newGame') {
                this.initialize();
            } else {
                this.displayGameOver();
            }
        });
        this.initialize();
    }

    private updatePlayerSection(pIndex: PlayerIndex): void {
        const { player1, player2 } = this.translations;
        this.playerNameLabel = pIndex === 1 ? player1 : player2;
        this.playingPlayerIndex = pIndex;
    }

    private initialize(): void {
        const { playerIndex, isGameOver } = this.store.selectSnapshot<{
            playerIndex: PlayerIndex | null;
            isGameOver: boolean;
        }>((state: AppState) => ({
            playerIndex: state.connect4.playerPlaying,
            isGameOver: state.connect4.gameOver
        }));
        const { yourTurn } = this.translations;

        this.updatePlayerSection(playerIndex);
        this.playerStatusLabel = yourTurn;
        this.gameOverLabel = null;
        this.isGameOver = isGameOver;
    }

    private displayGameOver(): void {
        const { winnerPlayerIndex, isGameOver } = this.store.selectSnapshot<{
            winnerPlayerIndex: PlayerIndex | null;
            isGameOver: boolean;
        }>((state: AppState) => ({
            winnerPlayerIndex: state.connect4.winner,
            isGameOver: state.connect4.gameOver
        }));
        const { draw, gameOver, noWinner, player1, player2, wins } = this.translations;

        this.isGameOver = isGameOver;

        if (winnerPlayerIndex === null) {
            this.gameOverLabel = draw;
            this.playerNameLabel = null;
            this.playingPlayerIndex = null;
            this.playerStatusLabel = noWinner;
        } else {
            this.gameOverLabel = gameOver;
            this.playerNameLabel = winnerPlayerIndex === 1 ? player1 : player2;
            this.playingPlayerIndex = winnerPlayerIndex;
            this.playerStatusLabel = wins;
        }
    }

    public newGame(): void {
        this.connect4Service.newGame();
    }
}
