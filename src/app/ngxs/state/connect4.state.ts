import { connect4 } from './../../settings/index';
import { NextTurn, SetGameOver, StartNewGame } from './../actions/connect4.actions';
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateBoard } from '../actions/connect4.actions';

export type PlayerIndex = 1 | 2;

export type Connect4Board = (PlayerIndex | null)[];

export type Connect4Status = {
    playerPlaying: PlayerIndex | null;
    winner: PlayerIndex | null;
    winConditionResolved: number[] | null;
    gameOver: boolean;
};

export type GameOverInfo = { winConditionResolved: number[] | null; byPlayer: PlayerIndex | null };

export interface Connect4Model {
    currentBoard: Connect4Board;
    playerPlaying: PlayerIndex | null;
    winner: PlayerIndex | null;
    winConditionResolved: number[] | null;
    gameOver: boolean;
}

const initialState: Connect4Model = {
    currentBoard: new Array(connect4.nbColumns * connect4.nbRows).fill(null),
    playerPlaying: null,
    winner: null,
    winConditionResolved: null,
    gameOver: false
};

@State<Connect4Model>({
    name: 'connect4',
    defaults: { ...initialState }
})
@Injectable()
export class Connect4State {
    constructor() {}

    @Selector()
    static getCurrentBoard(state: Connect4Model): Connect4Board {
        return state.currentBoard;
    }

    @Selector()
    static getGameStatus(state: Connect4Model): Connect4Status {
        const { playerPlaying, winner, gameOver, winConditionResolved } = state;
        return {
            playerPlaying,
            winner,
            winConditionResolved,
            gameOver
        };
    }

    @Action(UpdateBoard)
    updateBoard({ getState, patchState, dispatch }: StateContext<Connect4Model>, payload: UpdateBoard): void {
        const state = getState();
        const { circleIndex, playerIndex } = payload;
        const updatedBoard = [...state.currentBoard];
        updatedBoard[circleIndex] = playerIndex;
        dispatch(new NextTurn());
        patchState({
            ...state,
            currentBoard: updatedBoard
        });
    }

    @Action(NextTurn)
    nextTurn({ getState, patchState }: StateContext<Connect4Model>): void {
        const state = getState();
        const nextPlayerIndex = state.playerPlaying === 1 ? 2 : 1;

        patchState({
            ...state,
            playerPlaying: nextPlayerIndex
        });
    }

    @Action(SetGameOver)
    setGameOver({ getState, patchState }: StateContext<Connect4Model>, payload: GameOverInfo): void {
        const state = getState();
        patchState({
            ...state,
            winner: payload.byPlayer,
            winConditionResolved: payload.winConditionResolved,
            gameOver: true
        });
    }

    @Action(StartNewGame)
    startNewGame({ patchState }: StateContext<Connect4Model>): void {
        patchState({
            ...initialState,
            playerPlaying: (Math.floor(Math.random() * 2) + 1) as 1 | 2
        });
    }
}
