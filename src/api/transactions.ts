import axios from "axios";
import type { Transaction, CreateTransactionData } from "../types/transaction";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001",
});

export async function getTransactions(): Promise<Transaction[]> {
  const response = await api.get<Transaction[]>("/transactions");
  return response.data;
}

export async function createTransaction(
  data: CreateTransactionData,
): Promise<Transaction> {
  const response = await api.post<Transaction>("/transactions", data);
  return response.data;
}

export async function updateTransaction(
  id: string,
  data: CreateTransactionData,
): Promise<Transaction> {
  const response = await api.patch<Transaction>(`/transactions/${id}`, data);

  return response.data;
}

export async function deleteTransaction(id: string): Promise<void> {
  await api.delete<Transaction>(`/transactions/${id}`);
}
