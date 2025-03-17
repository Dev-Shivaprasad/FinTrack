import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
const data = [
  { name: "Food", value: 400, color: "#1E3A32" },
  { name: "Transport", value: 300, color: "#3F704D" },
  { name: "Bills", value: 300, color: "#5A9367" },
  { name: "Shopping", value: 200, color: "#A7C4A0" },
  { name: "Other", value: 100, color: "#CFE1B9" },];
export default function FinancialDashboard() {
 return (
    <div className="flex items-center justify-center min-h-screen bg-green-900 p-4">
      <div className="w-full max-w-4xl bg-white p-6 shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold text-green-900 text-center"> Dashboard: Your Financial Snapshot</h2>
        <p className="text-green-600 text-center mt-2">
          Your financial central hub displays total balance, income, expenses, and savings. </p>
        <p className="text-green-600 text-center">
          Visually engaging charts, graphs, and progress bars provide an at-a-glance understanding.</p>
        <div className="w-full h-[300px] flex justify-center mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
              
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
        <p className="text-left text-gray-400 mt-2">
          Users who actively track finances save an average of <strong>$6,000</strong> per year.
        </p>
      </div>
    </div>
  );}



