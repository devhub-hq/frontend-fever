import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Game from "../components/Game";

function setup() {
  const user = userEvent.setup();
  render(<Game />);
  return { user };
}

describe("Game component", () => {
  it("shows initial turn status", () => {
    setup();
    expect(screen.getByLabelText("status")).toHaveTextContent("Turn: X");
  });

  it("allows placing marks and toggles turn", async () => {
    const { user } = setup();
    const cell0 = screen.getByLabelText("cell-0");
    await user.click(cell0);
    expect(cell0).toHaveTextContent("X");
    expect(screen.getByLabelText("status")).toHaveTextContent("Turn: O");
  });

  it("resets the board", async () => {
    const { user } = setup();
    const cell0 = screen.getByLabelText("cell-0");
    await user.click(cell0);
    expect(cell0).toHaveTextContent("X");
    await user.click(screen.getByText("Reset"));
    expect(cell0).toHaveTextContent("");
    expect(screen.getByLabelText("status")).toHaveTextContent("Turn: X");
  });

  it("shows winner when horizontal row is achieved", async () => {
    const { user } = setup();
    const c0 = screen.getByLabelText("cell-0");
    const c1 = screen.getByLabelText("cell-1");
    const c2 = screen.getByLabelText("cell-2");
    const c3 = screen.getByLabelText("cell-3");
    const c4 = screen.getByLabelText("cell-4");

    await user.click(c0);
    await user.click(c3);
    await user.click(c1);
    await user.click(c4);
    await user.click(c2);

    expect(screen.getByLabelText("status")).toHaveTextContent("Winner: X");
  });

  it("shows winner when vertical column is achieved", async () => {
    const { user } = setup();
    const c0 = screen.getByLabelText("cell-0");
    const c1 = screen.getByLabelText("cell-1");
    const c2 = screen.getByLabelText("cell-2");
    const c3 = screen.getByLabelText("cell-3");
    const c6 = screen.getByLabelText("cell-6");
    const c8 = screen.getByLabelText("cell-8");

    await user.click(c1);
    await user.click(c0);
    await user.click(c2);
    await user.click(c3);
    await user.click(c8);
    await user.click(c6);

    expect(screen.getByLabelText("status")).toHaveTextContent("Winner: O");
  });

  it("shows winner when diagonal is achieved", async () => {
    const { user } = setup();
    const c0 = screen.getByLabelText("cell-0");
    const c4 = screen.getByLabelText("cell-4");
    const c8 = screen.getByLabelText("cell-8");
    const c1 = screen.getByLabelText("cell-1");
    const c3 = screen.getByLabelText("cell-3");

    await user.click(c0);
    await user.click(c1);
    await user.click(c4);
    await user.click(c3);
    await user.click(c8);

    expect(screen.getByLabelText("status")).toHaveTextContent("Winner: X");
  });

  it("shows draw when no winner and board is full", async () => {
    const { user } = setup();

    const cells = [
      screen.getByLabelText("cell-0"),
      screen.getByLabelText("cell-1"),
      screen.getByLabelText("cell-2"),
      screen.getByLabelText("cell-3"),
      screen.getByLabelText("cell-4"),
      screen.getByLabelText("cell-5"),
      screen.getByLabelText("cell-6"),
      screen.getByLabelText("cell-7"),
      screen.getByLabelText("cell-8"),
    ];

    await user.click(cells[0]);
    await user.click(cells[1]);
    await user.click(cells[2]);
    await user.click(cells[6]);
    await user.click(cells[3]);
    await user.click(cells[5]);
    await user.click(cells[8]);
    await user.click(cells[4]);
    await user.click(cells[7]);

    expect(screen.getByLabelText("status")).toHaveTextContent("Draw!");
  });

  it("prevents moves on occupied cells", async () => {
    const { user } = setup();
    const cell = screen.getByLabelText("cell-0");

    await user.click(cell);
    expect(cell).toHaveTextContent("X");

    await user.click(cell);
    expect(cell).toHaveTextContent("X");
    expect(screen.getByLabelText("status")).toHaveTextContent("Turn: O");
  });

  it("prevents moves after game is won", async () => {
    const { user } = setup();
    const c0 = screen.getByLabelText("cell-0");
    const c1 = screen.getByLabelText("cell-1");
    const c2 = screen.getByLabelText("cell-2");
    const c3 = screen.getByLabelText("cell-3");
    const c4 = screen.getByLabelText("cell-4");

    await user.click(c0);
    await user.click(c3);
    await user.click(c1);
    await user.click(c4);
    await user.click(c2);

    expect(screen.getByLabelText("status")).toHaveTextContent("Winner: X");

    await user.click(screen.getByLabelText("cell-5"));
    expect(screen.getByLabelText("cell-5")).toHaveTextContent("");
    expect(screen.getByLabelText("status")).toHaveTextContent("Winner: X");

    expect(screen.getByLabelText("status")).toHaveTextContent("Winner: X");
  });
});
