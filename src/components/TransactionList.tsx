import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import type { Transaction } from "../types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function TransactionList({ transactions }: TransactionListProps) {
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
        <Paper key={transaction.id} variant="outlined" sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Stack spacing={0.5}>
              <Typography fontWeight={600}>
                {transaction.description}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {transaction.category} ·{" "}
                {dateFormatter.format(new Date(`${transaction.date}T12:00:00`))}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                size="small"
                label={transaction.type === "income" ? "Income" : "Expense"}
                color={transaction.type === "income" ? "success" : "default"}
              />

              <Typography
                fontWeight={600}
                color={
                  transaction.type === "income"
                    ? "success.main"
                    : "text.primary"
                }
              >
                {transaction.type === "income" ? "+" : "−"}
                {currencyFormatter.format(transaction.amount)}
              </Typography>
            </Stack>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}

export default TransactionList;
