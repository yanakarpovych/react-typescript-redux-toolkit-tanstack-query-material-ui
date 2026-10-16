import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import TransactionList from "./components/TransactionList";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import type { Transaction, CreateTransactionData } from "./types/transaction";
import { createTransaction, getTransactions } from "./api/transactions";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch {
        setError("Failed to load transactions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTransactions();
  }, []);

  const handleAddTransaction = async (data: CreateTransactionData) => {
    const newTransaction = await createTransaction(data);

    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions,
    ]);

    return newTransaction;
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

        {isLoading && <CircularProgress />}

        {error && <Alert severity="error">{error}</Alert>}

        <SummaryCards transactions={transactions} />

        {!isLoading && (
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Transactions
            </Typography>

            <TransactionList transactions={transactions} />
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default App;
