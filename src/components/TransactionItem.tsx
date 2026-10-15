import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import type { Transaction } from "../types/transaction";

interface TransactionItemProps {
  transaction: Transaction;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === "income";

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
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
          <Typography sx={{ fontWeight: 600 }}>
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
            label={isIncome ? "Income" : "Expense"}
            color={isIncome ? "success" : "default"}
          />

          <Typography
            sx={{ fontWeight: 600 }}
            color={isIncome ? "success.main" : "text.primary"}
          >
            {isIncome ? "+" : "−"}
            {currencyFormatter.format(transaction.amount)}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}

export default TransactionItem;
