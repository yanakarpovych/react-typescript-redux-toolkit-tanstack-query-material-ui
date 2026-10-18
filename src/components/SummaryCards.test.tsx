import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SummaryCards from "./SummaryCards";
import type { Transaction } from "../types/transaction";

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

describe("SummaryCards", () => {
  it("calculates total income, expenses, and balance", () => {
    render(<SummaryCards transactions={transactions} />);

    expect(screen.getByText("Total income")).toBeInTheDocument();
    expect(screen.getByText("$2,500.00")).toBeInTheDocument();

    expect(screen.getByText("Total expenses")).toBeInTheDocument();
    expect(screen.getByText("$300.00")).toBeInTheDocument();

    expect(screen.getByText("Balance")).toBeInTheDocument();
    expect(screen.getByText("$2,200.00")).toBeInTheDocument();
  });
});
