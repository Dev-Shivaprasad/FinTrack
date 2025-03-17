import { ShoppingCart, Utensils, Bus, Calendar } from "lucide-react";
export default function ExpenseTracking() {
  return (
    <div className="h-[70vh] min-h-fit flex flex-col md:flex-row items-center justify-between bg-bg *: p-10 shadow-md lg:px-60">
      <div className="max-w-lg text-left">
        <h2 className="text-4xl font-Heading font-semibold text-secondary">
          {" "}
          Expense Tracking: <br />{" "}
          <span className="text-secondary/90">Effortless Input</span>
        </h2>
        <p className="mt-6 text-secondary/70">
          Add daily expenses quickly using our simple input form.{" "}
        </p>
        <p className="mt-6 text-secondary/70">
          Expenses are categorized for detailed tracking.
        </p>
        <div className="flex flex-wrap gap-6 mt-6">
          <div className="flex flex-col items-center">
            <Utensils className="text-primary/90 w-8 h-8" />
            <span className="mt-2  text-secondary/70 font-medium">Food</span>
          </div>
          <div className="flex flex-col items-center">
            <Bus className="text-primary/90 w-8 h-8" />
            <span className="mt-2  text-secondary/70 font-medium">
              Transport
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Calendar className="text-primary/90 w-8 h-8" />
            <span className="mt-2  text-secondary/70 font-medium">Bills</span>
          </div>
          <div className="flex flex-col items-center">
            <ShoppingCart className="text-primary/90 w-8 h-8" />
            <span className="mt-2  text-secondary/70 font-medium">
              Shopping
            </span>
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-0 md:ml-12">
        <img
          src="https://thumbs.dreamstime.com/b/tracking-expenses-inscription-card-near-office-supplies-computer-tracking-expenses-inscription-card-near-208911029.jpg"
          alt="Expense Tracking App"
          className="w-[400px] md:w-[380px] rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
