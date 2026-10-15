import { Box, Container, Paper, Typography } from "@mui/material";
import TransactionList from "./components/TransactionList";
import { transactions } from "./data/transactions";
import SummaryCards from "./components/SummaryCards";

function App() {
  return (
    <Container maxWidth="md">
      <Box component="main" sx={{ py: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Expense Tracker
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Track your income and expenses in one place.
        </Typography>
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
