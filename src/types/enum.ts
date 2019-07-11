export enum ChessType {
    none,
    black,
    red
}

// export enum NextChess {
//     red = ChessType.red,
//     black = ChessType.black
// }

export enum Degree {
    lighter = 9,
    middle = 25,
    higher = 64
}

export enum GameStatus {
    /*
    * 未开局
    */
    notStart,
    /*
    * 正在游戏中
    */
    gaming,
     /*
    * 红方胜利
    */
   redWin,
    /*
    * 黑方胜利
    */
   blackWin,
    /*
    * 平局
    */
   equal,
}