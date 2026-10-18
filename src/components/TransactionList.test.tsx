import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TransactionList from "./TransactionList";
import type { Transaction } from "../types/transaction";

vi.mock("./TransactionItem", () => ({
  default: ({ transaction }: { transaction: Transaction }) => (
    <div data-testid="transaction-item">
      {transaction.description} — {transaction.category}
    </div>
  ),
}));

const transactions: Transaction[] = [
  {
    id: "1",
    amount: 2500,
    type: "income",
    category: "Salary",
    date: "2026-10-01",
    description: "Monthly salary",
  },
  {
    id: "2",
    amount: 200,
    type: "expense",
    category: "Food",
    date: "2026-10-02",
    description: "Groceries",
  },
  {
    id: "3",
    amount: 100,
    type: "expense",
    category: "Transport",
    date: "2026-10-03",
    description: "Bus tickets",
  },
];

describe("TransactionList", () => {
  beforeEach(() => {
    render(
      <TransactionList
        transactions={transactions}
        onDeleteTransaction={vi.fn()}
        onEditTransaction={vi.fn()}
      />,
    );
  });

  it("filters transactions by search query", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByRole("textbox", { name: "Search" }), "food");

    const items = screen.getAllByTestId("transaction-item");

    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent("Groceries — Food");
  });

  it("filters transactions by type", async () => {
    const user = userEvent.setup();

    fireEvent.mouseDown(screen.getByRole("combobox", { name: "Type" }));

    await user.click(screen.getByRole("option", { name: "Income" }));

    const items = screen.getAllByTestId("transaction-item");

    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent("Monthly salary — Salary");
  });

  it("filters transactions by category", async () => {
    const user = userEvent.setup();

    fireEvent.mouseDown(screen.getByRole("combobox", { name: "Category" }));

    await user.click(screen.getByRole("option", { name: "Food" }));

    const items = screen.getAllByTestId("transaction-item");

    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent("Groceries — Food");
  });
});
