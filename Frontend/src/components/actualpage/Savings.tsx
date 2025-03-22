import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
type Saving = {
  id: number;
  source: string;
  amount: number;
  date: string;
  updatedAt: string;
};

const SavingsManager = () => {
  const [savings, setSavings] = useState<Saving[]>([]);
  const [newSaving, setNewSaving] = useState<Omit<Saving, "id" | "updatedAt">>({
    source: "",
    amount: 0,
    date: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);


  useEffect(() => {
    document.documentElement.classList.toggle("dark");
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSaving({ ...newSaving, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTimestamp = new Date().toLocaleString();
    if (editingId !== null) {
      setSavings(savings.map((saving) => (saving.id === editingId ? { ...newSaving, id: editingId, updatedAt: updatedTimestamp } : saving)));
      setEditingId(null);
    } else {
      setSavings([...savings, { ...newSaving, id: Date.now(), updatedAt: updatedTimestamp }]);
    }
    setNewSaving({ source: "", amount: 0, date: "" });
  };

  const handleEdit = (id: number) => {
    const savingToEdit = savings.find((saving) => saving.id === id);
    if (savingToEdit) {
      setNewSaving(savingToEdit);
      setEditingId(id);
    }
  };

  const handleDelete = (id: number) => {
    setSavings(savings.filter((saving) => saving.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Savings Manager</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
          <input type="text" name="source" placeholder="Source" value={newSaving.source} onChange={handleChange} className="p-2 border rounded dark:bg-gray-700" required />
          <input type="number" name="amount" placeholder="Amount" value={newSaving.amount} onChange={handleChange} className="p-2 border rounded dark:bg-gray-700" required />
          <input type="date" name="date" value={newSaving.date} onChange={handleChange} className="p-2 border rounded dark:bg-gray-700" required />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded w-full md:w-auto">{editingId !== null ? "Update" : "Add Saving"}</button>
        </form>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border p-2">Source</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Updated At</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {savings.map((saving) => (
                <tr key={saving.id} className="border border-gray-300 dark:border-gray-600">
                  <td className="p-2">{saving.source}</td>
                  <td className="p-2">${saving.amount}</td>
                  <td className="p-2">{saving.date}</td>
                  <td className="p-2">{saving.updatedAt}</td>
                  <td className="p-2 flex space-x-2">
                    <button onClick={() => handleEdit(saving.id)} className="px-2 py-1 bg-blue-500 text-white rounded">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(saving.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {savings.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4">No savings recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SavingsManager;
