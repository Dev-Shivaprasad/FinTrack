import React, { useState, useEffect } from 'react';
import {  Edit, Trash2 } from 'lucide-react';
type Transaction = {
  id: number;
  description: string;
  amount: number;
  date: string;
  updatedAt: string;
};
  const TransactionsManager = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id' | 'updatedAt'>>({
    description: '',
    amount: 0,
    date: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [darkMode] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTimestamp = new Date().toLocaleString();
    if (editingId !== null) {
      setTransactions(transactions.map((transaction) =>
        transaction.id === editingId ? { ...newTransaction, id: editingId, updatedAt: updatedTimestamp } : transaction
      ));
      setEditingId(null);
    } else {
      setTransactions([...transactions, { ...newTransaction, id: Date.now(), updatedAt: updatedTimestamp }]);
    }
    setNewTransaction({ description: '', amount: 0, date: '' });
  };
  const handleEdit = (id: number) => {
    const transactionToEdit = transactions.find((transaction) => transaction.id === id);
    if (transactionToEdit) {
      setNewTransaction(transactionToEdit);
      setEditingId(id);
    } };
  const handleDelete = (id: number) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };
 return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Transactions Manager</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newTransaction.description}
            onChange={handleChange}
            className="p-2 border rounded dark:bg-gray-700"
            required/>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={handleChange}
            className="p-2 border rounded dark:bg-gray-700"
            required />
          <input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleChange}
            className="p-2 border rounded dark:bg-gray-700"
            required />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded w-full md:w-auto">
            {editingId !== null ? 'Update' : 'Add Transaction'}
          </button>
        </form>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border p-2">Description</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Updated At</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border border-gray-300 dark:border-gray-600">
                  <td className="p-2">{transaction.description}</td>
                  <td className="p-2">${transaction.amount}</td>
                  <td className="p-2">{transaction.date}</td>
                  <td className="p-2">{transaction.updatedAt}</td>
                  <td className="p-2 flex space-x-2">
                    <button onClick={() => handleEdit(transaction.id)} className="px-2 py-1 bg-blue-500 text-white rounded">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(transaction.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4">No transactions recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );};
export default TransactionsManager;
