import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { Transaction } from "../types/transaction";
import TransactionItem from "./TransactionItem";
import { useState } from "react";

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onEditTransaction: (transaction: Transaction) => void;
}

type TransactionTypeFilter = "all" | "income" | "expense";

type SortOption = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

function TransactionList({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">No transactions yet.</Typography>
      </Paper>
    );
  }

  const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>("all");

  const [searchQuery, setSearchQuery] = useState("");

  const [sortOption, setSortOption] = useState<SortOption>("date-desc");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    const matchesSearch =
      transaction.description.toLowerCase().includes(normalizedQuery) ||
      transaction.category.toLowerCase().includes(normalizedQuery);

    return matchesType && matchesSearch;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortOption) {
      case "date-desc":
        return b.date.localeCompare(a.date);

      case "date-asc":
        return a.date.localeCompare(b.date);

      case "amount-desc":
        return b.amount - a.amount;

      case "amount-asc":
        return a.amount - b.amount;
    }
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel id="transaction-type-label">Type</InputLabel>

          <Select
            labelId="transaction-type-label"
            id="transaction-type"
            value={typeFilter}
            label="Type"
            onChange={(event) =>
              setTypeFilter(event.target.value as TransactionTypeFilter)
            }
          >
            <MenuItem value="all">All transactions</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expenses</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 190 }}>
          <InputLabel id="transaction-sort-label">Sort by</InputLabel>

          <Select
            labelId="transaction-sort-label"
            id="transaction-sort"
            value={sortOption}
            label="Sort by"
            onChange={(event) =>
              setSortOption(event.target.value as SortOption)
            }
          >
            <MenuItem value="date-desc">Newest first</MenuItem>
            <MenuItem value="date-asc">Oldest first</MenuItem>
            <MenuItem value="amount-desc">Highest amount</MenuItem>
            <MenuItem value="amount-asc">Lowest amount</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Search"
          placeholder="Search description or category"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          fullWidth
        />
      </Box>
      <Stack spacing={1.5}>
        {sortedTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDeleteTransaction}
            onEdit={onEditTransaction}
          />
        ))}
        {sortedTransactions.length === 0 && (
          <Typography
            color="text.secondary"
            sx={{ py: 3, textAlign: "center" }}
          >
            No transactions found.
          </Typography>
        )}
      </Stack>
    </>
  );
}

export default TransactionList;
