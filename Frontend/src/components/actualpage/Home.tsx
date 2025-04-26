function Dash() {
  return (
    <div className="bg-background min-h-screen h-fit flex flex-col justify-center items-center pt-14">
      <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 font-Heading m-5">
        Dashboard:
        <span className="text-green-700">Your Financial Snapshot</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-text rounded-xl p-6 shadow-md m-5">
        <div className="lg:pl-30">
          <h2 className="text-2xl font-semibold mb-4 text-background">
            Overview
          </h2>
          <p className=" mb-2 text-background/70">
            View all accounts and balances in one place. Track your spending
            habits with interactive charts.
          </p>
          <p className=" mb-6 text-background/70">
            Monitor your net worth and identify trends.
          </p>

          <h2 className="text-2xl font-semibold mb-2 text-background">
            Customization
          </h2>
          <p className="text-background/70">
            Customize dashboard widgets to match your needs. Add new financial
            metrics.
          </p>
        </div>

        <div className="flex justify-center object-cover">
          <img
            src="./Homepage-Dashbpard.jpg"
            alt="Financial dashboard charts"
            className="w-full max-w-md rounded-lg drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Dash;
