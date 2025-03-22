import React, { useState, useEffect } from "react";
import {  Edit, Trash2 } from "lucide-react";
type Budget = {
  id: number;
  category: string;
  amount: number;
  date: string;
  updatedAt: string;
};

const Budgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newBudget, setNewBudget] = useState<Omit<Budget, "id" | "updatedAt">>({
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
    setNewBudget({ ...newBudget, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();
    if (editingId !== null) {
      setBudgets(
        budgets.map((budget) =>
          budget.id === editingId ? { ...newBudget, id: editingId, updatedAt: timestamp } : budget
        )
      );
      setEditingId(null);
    } else {
      setBudgets([...budgets, { ...newBudget, id: Date.now(), updatedAt: timestamp }]);
    }
    setNewBudget({ category: "", amount: 0, date: "" });
  };

  const handleEdit = (id: number) => {
    const budgetToEdit = budgets.find((budget) => budget.id === id);
    if (budgetToEdit) {
      setNewBudget({ category: budgetToEdit.category, amount: budgetToEdit.amount, date: budgetToEdit.date });
      setEditingId(id);
    }
  };

  const handleDelete = (id: number) => {
    setBudgets(budgets.filter((budget) => budget.id !== id));
  };
  return (
    <div className="min-h-screen p-6 bg-gray-300 dark:bg-green-400 text-gray-300 dark:text-black">
      <div className="max-w-4xl mx-auto bg-black dark:bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Budget Manager</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-3">
          <input type="text" name="category" placeholder="Category" value={newBudget.category} onChange={handleChange} className="p-2 border rounded dark:bg-gray-400" required />
          <input type="number" name="amount" placeholder="Amount" value={newBudget.amount} onChange={handleChange} className="p-2 border rounded dark:bg-gray-400" required />
          <input type="date" name="date" value={newBudget.date} onChange={handleChange} className="p-2 border rounded dark:bg-gray-400" required />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded w-full md:w-auto">{editingId !== null ? "Update" : "Add Budget"}</button>
        </form>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-800">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-400">
                <th className="border p-2">Category</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Updated At</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((budget) => (
                <tr key={budget.id} className="border border-gray-300 dark:border-gray-600">
                  <td className="p-2">{budget.category}</td>
                  <td className="p-2">${budget.amount}</td>
                  <td className="p-2">{budget.date}</td>
                  <td className="p-2">{budget.updatedAt}</td>
                  <td className="p-2 flex space-x-2">
                    <button onClick={() => handleEdit(budget.id)} className="px-2 py-1 bg-blue-500 text-white rounded">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(budget.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {budgets.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4">No budgets recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Budgets;
