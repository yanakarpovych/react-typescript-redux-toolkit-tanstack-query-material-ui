import { Paper, Stack, Typography } from "@mui/material";
import type { Transaction } from "../types/transaction";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

function TransactionList({
  transactions,
  onDeleteTransaction,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">No transactions yet.</Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={1.5}>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDeleteTransaction}/>
      ))}
    </Stack>
  );
}

export default TransactionList;
