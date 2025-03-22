import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
type Expense = {
  id: number;
  category: string;
  amount: number;
  date: string;
  lastUpdated: string;
};

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Omit<Expense, "id" | "lastUpdated">>({
    category: "",
    amount: 0,
    date: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [darkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();
    if (editingId !== null) {
      setExpenses(expenses.map(exp => exp.id === editingId ? { ...newExpense, id: editingId, lastUpdated: timestamp } : exp));
      setEditingId(null);
    } else {
      setExpenses([...expenses, { ...newExpense, id: Date.now(), lastUpdated: timestamp }]);
    }
    setNewExpense({ category: "", amount: 0, date: "" });
  };

  const handleEdit = (id: number) => {
    const expenseToEdit = expenses.find(exp => exp.id === id);
    if (expenseToEdit) {
      setNewExpense(expenseToEdit);
      setEditingId(id);
    }
  };
  const handleDelete = (id: number) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-100 text-gray-900 dark:text-black">
      <div className="max-w-4xl mx-auto bg-white dark:bg-green-300 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col place-items-center justify-self-center mb-10 ">
          <h2 className="text-3xl font-bold">Expense Tracker</h2>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <input type="text" name="category" placeholder="Category" value={newExpense.category} onChange={handleChange} className="p-2 border rounded dark:bg-gray-400" required />
          <input type="number" name="amount" placeholder="Amount" value={newExpense.amount} onChange={handleChange} className="p-2 border rounded dark:bg-gray-400" required />
          <input type="date" name="date" value={newExpense.date} onChange={handleChange} className="p-2 border rounded dark:bg-gray-400" required />
          <button type="submit" className="px-6 py-3 bg-green-500 text-black rounded w-full md:w-auto">
            {editingId !== null ? "Update" : "Add Expense"}
          </button>
        </form>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse border border-black-900 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-900 dark:bg-gray-400">
                <th className="border p-3">Category</th>
                <th className="border p-3">Amount</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Last Updated</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                <tr key={exp.id} className="border border-black-900 dark:border-gray-900">
                  <td className="p-2">{exp.category}</td>
                  <td className="p-2">${exp.amount}</td>
                  <td className="p-2">{exp.date}</td>
                  <td className="p-2">{exp.lastUpdated}</td>
                  <td className="p-2 flex space-x-2">
                    <button onClick={() => handleEdit(exp.id)} className="px-2 py-1 bg-blue-500 text-white rounded">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(exp.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4">No expenses recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;