import { PlayerIndex } from './../state/connect4.state';

export class UpdateBoard {
    static readonly type = '[Connect4] Update board';
    constructor(public circleIndex: number, public playerIndex: PlayerIndex) {}
}

export class NextTurn {
    static readonly type = "[Connect4] Next player's turn";
    constructor() {}
}

export class SetGameOver {
    static readonly type = '[Connect4] Game is over';
    constructor(winnerPlayerIndex: PlayerIndex | null = null) {}
}

export class StartNewGame {
    static readonly type = '[Connect4] New game start';
    constructor() {}
}
