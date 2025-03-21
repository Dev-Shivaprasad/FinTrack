const SavingGoal = () => {
  return (
    <div className="flex min-h-fit h-[50vh] flex-col lg:flex-row items-center gap-8 p-6 bg-secondary">
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src="https://th.bing.com/th/id/OIP.HqilpO6Z_GCUpC428VkGQAHaEo?rs=1&pid=ImgDetMain"
          alt="Savings Goals App"
          className="w-full shadow-lg rounded-xl"
        />
      </div>
      <div className="w-full lg:w-1/2">
        <h2 className="text-3xl font-bold text-primary font-Heading">
          Savings Goals: Visualize Your Dreams
        </h2>
        <p className="text-secondary/70 mt-2">
          Create and track specific savings goals. Visualize progress and
          automate transfers to savings accounts.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-accent w-full p-4 rounded-lg font-medium text-center">
            Down Payment
          </div>
          <div className="bg-accent w-full p-4 rounded-lg font-medium text-center">
            Vacation
          </div>
          <div className="bg-accent col-span-2 w-full p-4 rounded-lg font-medium text-center">
            Retirement
          </div>
        </div>
      </div>
    </div>
  );
};
export default SavingGoal;
