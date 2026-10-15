
import { Box, Container, Paper, Typography } from '@mui/material'

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

        <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Transactions
          </Typography>

          <Typography color="text.secondary">
            Your transactions will appear here.
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}

export default App
