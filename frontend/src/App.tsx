import { useEffect, useState } from 'react';
import { api } from './api';
import type { Transaction, Summary as SummaryType } from './api';
import { Summary } from './components/Summary';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';

function App() {
  const [summary, setSummary] = useState<SummaryType | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [summaryData, transactionsData] = await Promise.all([
        api.getSummary(),
        api.getTransactions()
      ]);
      setSummary(summaryData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTransactionSubmit = async (data: any) => {
    try {
      await api.createTransaction(data);
      // Refresh data
      await fetchData();
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert('新增失敗，請檢查伺服器連線');
    }
  };

  return (
    <div className="min-h-screen bg-water-blue/20 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-md mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-forest-green tracking-wide">Nature Expense</h1>
          <p className="text-sm text-slate-500 mt-1">Simple & Clean Tracker</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-green"></div>
          </div>
        ) : (
          <>
            <Summary summary={summary} />
            <TransactionForm onSubmit={handleTransactionSubmit} />
            <TransactionList transactions={transactions} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
