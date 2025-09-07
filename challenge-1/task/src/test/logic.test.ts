import { describe, it, expect } from "vitest";
import {
  applyMove,
  checkWinner,
  createEmptyBoard,
  getNextPlayer,
  isDraw,
} from "../game/logic";
import type { GameConfig } from "../game/types";

const config: GameConfig = { boardSize: 3, targetInRow: 3 };

describe("game logic", () => {
  it("creates an empty board", () => {
    const board = createEmptyBoard(3);
    expect(board.size).toBe(3);
    expect(board.cells).toHaveLength(9);
    expect(board.cells.every((c) => c === null)).toBe(true);
  });

  it("toggles next player", () => {
    expect(getNextPlayer("X")).toBe("O");
    expect(getNextPlayer("O")).toBe("X");
  });

  it("detects horizontal winner with M in a row", () => {
    const size = 3;
    const m = 3;
    const board = createEmptyBoard(size);
    const rowStart = 1 * size;
    board.cells[rowStart + 0] = "X";
    board.cells[rowStart + 1] = "X";
    const result = applyMove(board, rowStart + 2, "X", {
      boardSize: size,
      targetInRow: m,
    });
    expect(result.winner).toBe("X");
    expect(result.isDraw).toBe(false);
  });

  it("detects vertical winner with M in a column", () => {
    const size = 3;
    const m = 3;
    const board = createEmptyBoard(size);
    const col = 1;
    board.cells[col + 0 * size] = "O";
    board.cells[col + 1 * size] = "O";
    const result = applyMove(board, col + 2 * size, "O", {
      boardSize: size,
      targetInRow: m,
    });
    expect(result.winner).toBe("O");
  });

  it("detects diagonal winner (top-left to bottom-right)", () => {
    const size = 3;
    const m = 3;
    const board = createEmptyBoard(size);
    board.cells[0] = "X"; // (0,0)
    board.cells[4] = "X"; // (1,1)
    const result = applyMove(board, 8, "X", {
      boardSize: size,
      targetInRow: m,
    });
    expect(result.winner).toBe("X");
  });

  it("detects diagonal winner (top-right to bottom-left)", () => {
    const size = 3;
    const m = 3;
    const board = createEmptyBoard(size);

    board.cells[2] = "O";
    board.cells[4] = "O";
    const result = applyMove(board, 6, "O", {
      boardSize: size,
      targetInRow: m,
    });
    expect(result.winner).toBe("O");
  });

  it("reports draw when all cells filled and no winner", () => {
    const size = 3;
    const board = createEmptyBoard(size);
    const pattern = ["X", "O", "X", "X", "O", "O", "O", "X", "X"] as const;
    for (let i = 0; i < pattern.length; i++) {
      board.cells[i] = pattern[i];
    }
    expect(isDraw(board)).toBe(true);
  });

  it("does not allow overwriting an occupied cell", () => {
    const board = createEmptyBoard(3);
    board.cells[0] = "X";
    expect(() =>
      applyMove(board, 0, "O", { boardSize: 3, targetInRow: 3 })
    ).toThrow();
  });

  it("detects winner for the last move using checkWinner", () => {
    const board = createEmptyBoard(3);
    board.cells[0] = "X";
    board.cells[1] = "X";
    const result = applyMove(board, 2, "X", { boardSize: 3, targetInRow: 3 });
    expect(result.winner).toBe("X");
    expect(result.isDraw).toBe(false);
    expect(checkWinner(board, 2, "X", { boardSize: 3, targetInRow: 3 })).toBe(
      "X"
    );
  });
});
