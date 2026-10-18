import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TransactionItem from "./TransactionItem";
import type { Transaction } from "../types/transaction";

const transaction: Transaction = {
  id: "1",
  amount: 25.5,
  type: "expense",
  category: "Food",
  date: "2026-10-15",
  description: "Groceries",
};

describe("TransactionItem", () => {
  it("renders transaction details", () => {
    render(
      <TransactionItem
        transaction={transaction}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("Food · Oct 15, 2026")).toBeInTheDocument();
    expect(screen.getByText("Expense")).toBeInTheDocument();
    expect(screen.getByText("−$25.50")).toBeInTheDocument();
  });

  it("calls onDelete with the transaction ID when delete is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <TransactionItem
        transaction={transaction}
        onDelete={onDelete}
        onEdit={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Delete transaction: Groceries",
      }),
    );

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("calls onEdit with the transaction when edit is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(
      <TransactionItem
        transaction={transaction}
        onDelete={vi.fn()}
        onEdit={onEdit}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Edit transaction: Groceries",
      }),
    );

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(transaction);
  });
});
