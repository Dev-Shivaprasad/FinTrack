import { ShoppingCart, Utensils, Bus, Calendar } from "lucide-react";
export default function ExpenseTracking() {
      return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-[#f8faf7] p-10 rounded-lg shadow-md">
      <div className="max-w-lg text-left">
        <h2 className="text-4xl font-semibold text-green-400"> Expense Tracking: <br /> <span className="text-green-400">Effortless Input</span></h2>
        <p className="mt-2 text-gray-500">Add daily expenses quickly using our simple input form. </p>
        <p className="mt-2 text-gray-500">Expenses are categorized for detailed tracking. Bank integration is available with Plaid API.</p>
        <div className="flex flex-wrap gap-6 mt-6">
          <div className="flex flex-col items-center">
            <Utensils className="text-green-300 w-8 h-8" />
            <span className="mt-2 text-gray-500 font-medium">Food</span>
          </div>
          <div className="flex flex-col items-center">
            <Bus className="text-green-300 w-8 h-8" />
            <span className="mt-2 text-gray-500 font-medium">Transport</span>
          </div>
          <div className="flex flex-col items-center">
            <Calendar className="text-green-300 w-8 h-8" />
            <span className="mt-2 text-gray-500 font-medium">Bills</span>
          </div>
          <div className="flex flex-col items-center">
            <ShoppingCart className="text-green-300 w-8 h-8" />
            <span className="mt-2 text-gray-500 font-medium">Shopping</span>
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-0 md:ml-12">
        <img
          src="https://thumbs.dreamstime.com/b/tracking-expenses-inscription-card-near-office-supplies-computer-tracking-expenses-inscription-card-near-208911029.jpg" 
          alt="Expense Tracking App"
          className="w-[400px] md:w-[380px] rounded-lg shadow-lg"/>
      </div>
    </div>
  );}
