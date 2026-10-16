import axios from "axios";
import type { Transaction, CreateTransactionData } from "../types/transaction";

const api = axios.create({
  baseURL: "http://localhost:3001",
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
