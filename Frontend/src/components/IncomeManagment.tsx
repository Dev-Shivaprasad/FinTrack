export default function IncomeManagement() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1F3D36] p-6">
        <div className="bg-[#f8faf7] shadow-lg rounded-lg p-10 max-w-3xl">
          <h2 className="text-4xl font-bold text-gray-800">Income Management: <br />
          <span className="text-gray-700">Track Your Earnings</span></h2>
          <p className="mt-4 text-gray-600">Track multiple income sources with ease.</p>
          <p className="mt-2 text-gray-600">Categorize income (e.g., Salary, Investments, Side Hustle)</p>
          <p className="mt-2 text-gray-600">Visualize income trends over time.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Salary</h3>
              <p className="text-gray-600 text-sm">Track your main source of income.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Investments</h3>
              <p className="text-gray-600 text-sm">Monitor your investment earnings.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Side Hustle</h3>
              <p className="text-gray-600 text-sm">Record income from freelance work.</p>
            </div>
          </div>
        </div>
      </div>);}
  