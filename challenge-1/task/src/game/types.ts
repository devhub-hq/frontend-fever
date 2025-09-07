export type PlayerMark = "X" | "O";
export type CellMark = PlayerMark | null;

export interface GameConfig {
  boardSize: number;
  targetInRow: number;
}

export interface BoardState {
  cells: CellMark[];
  size: number;
}

export interface MoveResult {
  winner: PlayerMark | null;
  isDraw: boolean;
}
