import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "../App";
import { getTransactions } from "../api/transactions";
import { ThemeProvider } from "../context/ThemeContext";
import { store } from "../store/store";

vi.mock("../api/transactions", () => ({
  getTransactions: vi.fn(),
  createTransaction: vi.fn(),
  updateTransaction: vi.fn(),
  deleteTransaction: vi.fn(),
}));

vi.mock("./TransactionForm", () => ({
  default: () => <div>Transaction form</div>,
}));

vi.mock("./SummaryCards", () => ({
  default: () => <div>Summary cards</div>,
}));

vi.mock("./TransactionList", () => ({
  default: () => <div>Transaction list</div>,
}));

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>,
  );
}

describe("App", () => {
  beforeEach(() => {
    vi.mocked(getTransactions).mockReset();
  });

  it("shows an error when transactions fail to load", async () => {
    vi.mocked(getTransactions).mockRejectedValue(
      new Error("Failed to fetch transactions"),
    );

    renderApp();

    expect(
      await screen.findByText("Failed to load transactions. Please try again."),
    ).toBeInTheDocument();

    expect(screen.queryByText("Summary cards")).not.toBeInTheDocument();
    expect(screen.queryByText("Transaction list")).not.toBeInTheDocument();
  });

  it("shows the transaction dashboard when loading succeeds", async () => {
    vi.mocked(getTransactions).mockResolvedValue([
      {
        id: "1",
        amount: 100,
        type: "income",
        category: "Salary",
        date: "2026-10-01",
        description: "Monthly salary",
      },
    ]);

    renderApp();

    expect(await screen.findByText("Summary cards")).toBeInTheDocument();

    expect(screen.getByText("Transaction list")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Expense Tracker" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Failed to load transactions. Please try again."),
    ).not.toBeInTheDocument();
  });
});
