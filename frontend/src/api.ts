const API_URL = 'http://localhost:8000/api';

export interface Transaction {
  id: number;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface TransactionCreate {
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface Summary {
  year: number;
  month: number;
  total_expenses: number;
}

export const api = {
  getTransactions: async (skip = 0, limit = 10): Promise<Transaction[]> => {
    const response = await fetch(`${API_URL}/transactions?skip=${skip}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
  },

  createTransaction: async (data: TransactionCreate): Promise<Transaction> => {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create transaction');
    return response.json();
  },

  getSummary: async (): Promise<Summary> => {
    const response = await fetch(`${API_URL}/summary`);
    if (!response.ok) throw new Error('Failed to fetch summary');
    return response.json();
  },
};
