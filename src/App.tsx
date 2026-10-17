import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "./api/transactions";
import type { CreateTransactionData, Transaction } from "./types/transaction";
import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useThemeMode } from "./context/ThemeContext";

function App() {
  const queryClient = useQueryClient();

  const {
    data: transactions = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);

  const createMutation = useMutation({
    mutationFn: (data: CreateTransactionData) => createTransaction(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateTransactionData }) =>
      updateTransaction(id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });

  const handleAddTransaction = (
    data: CreateTransactionData,
  ): Promise<Transaction> => {
    return createMutation.mutateAsync(data);
  };

  const handleUpdateTransaction = (
    id: string,
    data: CreateTransactionData,
  ): Promise<Transaction> => {
    return updateMutation.mutateAsync({ id, data });
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
  };

  const handleCancelEdit = () => {
    setTransactionToEdit(null);
  };

  const handleDeleteTransaction = (id: string) => {
    deleteMutation.mutate(id);
  };

  const { mode, toggleTheme } = useThemeMode();

  return (
    <Container maxWidth="md">
      <Box component="main" sx={{ py: 5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Expense Tracker
          </Typography>

          <Tooltip
            title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          >
            <IconButton onClick={toggleTheme} aria-label="Toggle color theme">
              {mode === "light" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Track your income and expenses in one place.
        </Typography>
        <Box sx={{ mb: 4 }}>
          <TransactionForm
            onAddTransaction={handleAddTransaction}
            transactionToEdit={transactionToEdit}
            onUpdateTransaction={handleUpdateTransaction}
            onCancelEdit={handleCancelEdit}
          />
        </Box>

        {isPending && <CircularProgress />}

        {isError && (
          <Alert severity="error" sx={{ my: 2 }}>
            Failed to load transactions. Please try again.
          </Alert>
        )}

        {updateMutation.isError && (
          <Alert severity="error" sx={{ my: 2 }}>
            Failed to update transaction. Please try again.
          </Alert>
        )}

        {deleteMutation.isError && (
          <Alert severity="error" sx={{ my: 2 }}>
            Failed to delete transaction. Please try again.
          </Alert>
        )}

        {!isPending && !isError && (
          <>
            <SummaryCards transactions={transactions} />

            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Transactions
              </Typography>

              <TransactionList
                transactions={transactions}
                onDeleteTransaction={handleDeleteTransaction}
                onEditTransaction={handleEditTransaction}
              />
            </Paper>
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
