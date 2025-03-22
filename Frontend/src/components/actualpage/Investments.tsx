import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
type Investment = {
  id: number;
  asset: string;
  amountInvested: string;
  returnRate: string;
  purchaseDate: string;
  updated: string;
};
  const Investments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [newInvestment, setNewInvestment] = useState<Omit<Investment, "id" | "updated">>({
    asset: "",
    amountInvested: "",
    returnRate: "",
    purchaseDate: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [darkMode] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewInvestment({ ...newInvestment, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();
    if (editingId !== null) {
      setInvestments(
        investments.map((inv) =>
          inv.id === editingId ? { ...newInvestment, id: editingId, updated: timestamp } : inv
        ));
      setEditingId(null);
    } else {
      setInvestments([...investments, { ...newInvestment, id: Date.now(), updated: timestamp }]);
    }
    setNewInvestment({ asset: "", amountInvested: "", returnRate: "", purchaseDate: "" });
  };
  const handleEdit = (id: number) => {
    const investmentToEdit = investments.find((inv) => inv.id === id);
    if (investmentToEdit) {
      setNewInvestment(investmentToEdit);
      setEditingId(id);
    }};
  const handleDelete = (id: number) => {
    setInvestments(investments.filter((inv) => inv.id !== id));
  };
return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Investment Manager</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
          <input type="text" name="asset" placeholder="Asset Name" value={newInvestment.asset} onChange={handleChange} className="p-2 border rounded dark:bg-gray-700" required />
          <input type="number" name="amountInvested" placeholder="Amount Invested" value={newInvestment.amountInvested} onChange={handleChange} className="p-2 border rounded dark:bg-gray-700" required />
          <input type="number" name="returnRate" placeholder="Return Rate (%)" value={newInvestment.returnRate} onChange={handleChange} className="p-2 border rounded dark:bg-gray-700" required />
          <input type="date" name="purchaseDate" value={newInvestment.purchaseDate} onChange={handleChange} className="p-2 border rounded dark:bg-gray-700" required />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded w-full md:w-auto">
            {editingId !== null ? "Update" : "Add Investment"}
          </button>
        </form>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border p-2">Asset</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Return (%)</th>
                <th className="border p-2">Purchase Date</th>
                <th className="border p-2">Last Updated</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.id} className="border border-gray-900 dark:border-gray-300">
                  <td className="p-2">{inv.asset}</td>
                  <td className="p-2">${inv.amountInvested}</td>
                  <td className="p-2">{inv.returnRate}%</td>
                  <td className="p-2">{inv.purchaseDate}</td>
                  <td className="p-2">{inv.updated}</td>
                  <td className="p-2 flex space-x-2">
                    <button onClick={() => handleEdit(inv.id)} className="px-2 py-1 bg-blue-500 text-white rounded">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(inv.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {investments.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4">No investments recorded!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Investments;
