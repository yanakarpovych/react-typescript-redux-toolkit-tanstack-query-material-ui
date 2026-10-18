import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TransactionForm from "./TransactionForm";
import type { Transaction } from "../types/transaction";

const savedTransaction: Transaction = {
  id: "1",
  amount: 25.5,
  type: "expense",
  category: "Food",
  date: "2026-10-15",
  description: "Groceries",
};

describe("TransactionForm", () => {
  it("does not submit invalid data", async () => {
    const user = userEvent.setup();
    const onAddTransaction = vi.fn().mockResolvedValue(savedTransaction);

    render(<TransactionForm onAddTransaction={onAddTransaction} />);

    await user.click(screen.getByRole("button", { name: "Add Transaction" }));

    await waitFor(() => {
      expect(onAddTransaction).not.toHaveBeenCalled();
    });
  });

  it("submits valid transaction data", async () => {
    const user = userEvent.setup();
    const onAddTransaction = vi.fn().mockResolvedValue(savedTransaction);

    render(<TransactionForm onAddTransaction={onAddTransaction} />);

    await user.type(
      screen.getByRole("spinbutton", { name: "Amount (USD)" }),
      "25.50",
    );
    await user.type(screen.getByRole("textbox", { name: "Category" }), "Food");
    await user.type(
      screen.getByRole("textbox", { name: "Description" }),
      "Groceries",
    );

    await user.click(screen.getByRole("button", { name: "Add Transaction" }));

    await waitFor(() => {
      expect(onAddTransaction).toHaveBeenCalledTimes(1);
    });

    expect(onAddTransaction).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 25.5,
        type: "expense",
        category: "Food",
        description: "Groceries",
      }),
    );
  });
});
