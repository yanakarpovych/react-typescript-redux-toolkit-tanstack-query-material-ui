import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  transactionSchema,
  type TransactionFormData,
} from "../schemas/transactionSchema";
import type { CreateTransactionData, Transaction } from "../types/transaction";
import { useEffect, useState } from "react";

interface TransactionFormProps {
  onAddTransaction: (data: CreateTransactionData) => Promise<Transaction>;
  transactionToEdit?: Transaction | null;
  onUpdateTransaction?: (
    id: string,
    data: CreateTransactionData,
  ) => Promise<Transaction>;
  onCancelEdit?: () => void;
}

const today = new Date().toISOString().split("T")[0];

export default function TransactionForm({
  onAddTransaction,
  transactionToEdit = null,
  onUpdateTransaction,
  onCancelEdit,
}: TransactionFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      type: "expense",
      category: "",
      date: today,
      description: "",
    },
  });

  useEffect(() => {
    if (transactionToEdit) {
      reset({
        amount: transactionToEdit.amount,
        type: transactionToEdit.type,
        category: transactionToEdit.category,
        date: transactionToEdit.date,
        description: transactionToEdit.description,
      });
    } else {
      reset({
        amount: 0,
        type: "expense",
        category: "",
        date: today,
        description: "",
      });
    }
  }, [transactionToEdit, reset, today]);

  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: TransactionFormData) => {
    setApiError(null);

    try {
      if (transactionToEdit && onUpdateTransaction) {
        await onUpdateTransaction(transactionToEdit.id, data);
      } else {
        await onAddTransaction(data);
      }

      reset({
        amount: 0,
        type: "expense",
        category: "",
        date: today,
        description: "",
      });

      onCancelEdit?.();
    } catch {
      setApiError(
        transactionToEdit
          ? "Failed to update transaction. Please try again."
          : "Failed to save transaction. Please try again.",
      );
    }
  };

  return (
    <Paper component="section" variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {apiError && <Alert severity="error">{apiError}</Alert>}
        <Stack spacing={2}>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(value === "" ? 0 : Number(value));
                }}
                label="Amount (USD)"
                type="number"
                fullWidth
                error={!!errors.amount}
                helperText={errors.amount?.message}
                slotProps={{
                  htmlInput: { min: 0, max: 1_000_000, step: 0.01 },
                }}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Type"
                fullWidth
                error={!!errors.type}
                helperText={errors.type?.message}
              >
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="income">Income</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Category"
                placeholder="e.g. Food, Salary, Transport"
                fullWidth
                error={!!errors.category}
                helperText={errors.category?.message}
                slotProps={{ htmlInput: { maxLength: 50 } }}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date"
                type="date"
                fullWidth
                error={!!errors.date}
                helperText={errors.date?.message}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                placeholder="What was this transaction for?"
                fullWidth
                multiline
                minRows={2}
                error={!!errors.description}
                helperText={errors.description?.message}
                slotProps={{ htmlInput: { maxLength: 200 } }}
              />
            )}
          />

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : transactionToEdit
                ? "Update Transaction"
                : "Add Transaction"}
          </Button>

          {transactionToEdit && (
            <Button
              type="button"
              onClick={onCancelEdit}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Box>
    </Paper>
  );
}
