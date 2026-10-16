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
  deleteTransaction,
} from "./api/transactions";
import type { CreateTransactionData, Transaction } from "./types/transaction";

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

  const createMutation = useMutation({
    mutationFn: (data: CreateTransactionData) => createTransaction(data),
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

  const handleDeleteTransaction = (id: string) => {
    deleteMutation.mutate(id);
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

        {isPending && <CircularProgress />}

        {isError && (
          <Alert severity="error" sx={{ my: 2 }}>
            Failed to load transactions. Please try again.
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
              />
            </Paper>
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
