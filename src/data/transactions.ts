import type { Transaction } from "../types/transaction";

export const transactions: Transaction[] = [
  {
    id: "1",
    amount: 500,
    type: "income",
    category: "Salary",
    date: "2026-10-01",
    description: "Monthly salary",
  },
  {
    id: "2",
    amount: 10,
    type: "expense",
    category: "Food",
    date: "2026-10-03",
    description: "Groceries",
  },
  {
    id: "3",
    amount: 25,
    type: "expense",
    category: "Transport",
    date: "2026-10-05",
    description: "Taxi and public transport",
  },
  {
    id: "4",
    amount: 75,
    type: "income",
    category: "Freelance",
    date: "2026-10-10",
    description: "Website project",
  },
];
