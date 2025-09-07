# N x N Tic‑tac‑toe (M in a row)

This is a scaffold for an advanced tic‑tac‑toe game where the board is N x N and a player wins with M marks in a row (horizontal, vertical, or diagonal).

Your tasks:

- Implement game logic in `src/game/logic.ts` (`applyMove`, `checkWinner`, `isDraw`).
- Wire the `Game` component in `src/components/Game.tsx` to use the logic for placing moves, updating status, and preventing invalid moves.
- Ensure the UI displays whose turn it is, the winner, or a draw. Include a working Reset.

## Scripts

- `pnpm dev` — start the dev server
- `pnpm test` — run tests once
- `pnpm test:watch` — run tests in watch mode

## File structure

- `src/game/types.ts` — shared types
- `src/game/logic.ts` — game logic (to implement)
- `src/test/logic.test.ts` — unit tests for logic (will fail until implemented)
- `src/components/Game.tsx` — UI component (contains TODOs)
- `src/test/Game.test.tsx` — component tests (some commented expectations to guide you)
- `src/test/setup.ts` — test setup for Testing Library and jest‑dom

## Hints

- A cell index `i` maps to row `r = Math.floor(i / size)` and col `c = i % size`.
- Check 4 directions for M‑in‑a‑row: horizontal, vertical, diagonal TL↘BR, diagonal TR↙BL.
- Avoid mutating arrays in place in React state; create new arrays.
