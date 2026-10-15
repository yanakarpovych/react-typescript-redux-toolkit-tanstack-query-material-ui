import { useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

import TransactionList from "./components/TransactionList";
import { transactions as initialTransactions } from "./data/transactions";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import type { Transaction, CreateTransactionData } from "./types/transaction";

function App() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const handleAddTransaction = (data: CreateTransactionData) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      ...data,
    };

    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions,
    ]);
  };

  return (
    <Container maxWidth="md">
      <Box component="main" sx={{ py: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Expense Tracker
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Track your income and expenses in one place.
        </Typography>

        <TransactionForm onAddTransaction={handleAddTransaction} />

        <SummaryCards transactions={transactions} />

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Transactions
          </Typography>

          <TransactionList transactions={transactions} />
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
