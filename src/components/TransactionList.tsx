import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { Transaction } from "../types/transaction";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onEditTransaction: (transaction: Transaction) => void;
}

type TransactionTypeFilter = "all" | "income" | "expense";

function TransactionList({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}: TransactionListProps) {
  const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const categories = [
    ...new Set(transactions.map((transaction) => transaction.category)),
  ].sort((a, b) => a.localeCompare(b));

  const visibleTransactions = transactions.filter((transaction) => {
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    const matchesSearch =
      transaction.description.toLowerCase().includes(normalizedQuery) ||
      transaction.category.toLowerCase().includes(normalizedQuery);

    const matchesCategory =
      categoryFilter === "all" || transaction.category === categoryFilter;

    return matchesType && matchesSearch && matchesCategory;
  });

  if (transactions.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">No transactions yet.</Typography>
      </Paper>
    );
  }

  return (
    <>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Search"
          placeholder="Search description or category"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          fullWidth
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          <FormControl fullWidth>
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

          <FormControl fullWidth>
            <InputLabel id="transaction-category-label">Category</InputLabel>
            <Select
              labelId="transaction-category-label"
              id="transaction-category"
              value={categoryFilter}
              label="Category"
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <MenuItem value="all">All categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={() => {
              setTypeFilter("all");
              setCategoryFilter("all");
              setSearchQuery("");
            }}
          >
            Clear filters
          </Button>
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        {visibleTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDeleteTransaction}
            onEdit={onEditTransaction}
          />
        ))}

        {visibleTransactions.length === 0 && (
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
