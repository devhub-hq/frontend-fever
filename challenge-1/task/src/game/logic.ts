import type {
  BoardState,
  CellMark,
  GameConfig,
  MoveResult,
  PlayerMark,
} from "./types";

export function createEmptyBoard(size: number): BoardState {}

export function getNextPlayer(current: PlayerMark): PlayerMark {}

export function applyMove(
  board: BoardState,
  index: number,
  mark: PlayerMark,
  config: GameConfig
): MoveResult {}

export function checkWinner(
  board: BoardState,
  lastIndex: number,
  mark: PlayerMark,
  config: GameConfig
): PlayerMark | null {}

export function isDraw(board: BoardState): boolean {}
