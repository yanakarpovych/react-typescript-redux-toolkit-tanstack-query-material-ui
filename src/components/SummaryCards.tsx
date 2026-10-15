import { Box, Paper, Typography } from "@mui/material";
import type { Transaction } from "../types/transaction";

interface SummaryCardsProps {
  transactions: Transaction[];
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function SummaryCards({ transactions }: SummaryCardsProps) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  const summaries = [
    { title: "Total income", amount: totalIncome },
    { title: "Total expenses", amount: totalExpenses },
    { title: "Balance", amount: balance },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(3, minmax(0, 1fr))",
        },
        gap: 2,
        mb: 4,
      }}
    >
      {summaries.map((summary) => (
        <Paper key={summary.title} variant="outlined" sx={{ p: 2 }}>
          <Typography color="text.secondary" variant="body2">
            {summary.title}
          </Typography>

          <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>
            {currencyFormatter.format(summary.amount)}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default SummaryCards;
