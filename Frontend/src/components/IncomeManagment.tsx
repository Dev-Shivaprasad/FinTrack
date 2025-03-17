export default function IncomeManagement() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-secondary p-6">
        <div className="bg-text shadow-lg rounded-lg p-10 max-w-3xl">
          <h2 className="text-4xl font-bold font-Heading text-secondary ">Income Management: <br />
          <span>Track Your Earnings</span></h2>
          <p className="mt-4 text-secondary/80 text-sm">Track multiple income sources with ease.</p>
          <p className="mt-4 text-secondary/80 text-sm">Categorize income (e.g., Salary, Investments, Side Hustle)</p>
          <p className="mt-4 text-secondary/80 text-sm">Visualize income trends over time.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold text-accent">Salary</h3>
              <p className="text-secondary/80 text-sm ">Track your main source of income.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-accent">Investments</h3>
              <p className="text-secondary/80 text-sm ">Monitor your investment earnings.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-accent">Side Hustle</h3>
              <p className="text-secondary/80  text-sm">Record income from freelance work.</p>
            </div>
          </div>
        </div>
      </div>);}
  