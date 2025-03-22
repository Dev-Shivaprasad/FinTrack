import React from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import DatePicker from "react-datepicker";
import { Maximize2, ChevronDown, Pencil, Trash2 } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

interface DebtFormData {
  lender: string;
  amountOwed: number;
  interestRate: number;
  dueDate: Date;
}

interface DebtEntry extends DebtFormData {
  id: string;
  createdAt: Date;
}
const Debts = () => {
  const [debts, setDebts] = React.useState<DebtEntry[]>([]);
  const [isFormCollapsed, setIsFormCollapsed] = React.useState(false);
  const [isTableCollapsed, setIsTableCollapsed] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<DebtFormData>();

  const onSubmit = (data: DebtFormData) => {
    const newDebt: DebtEntry = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setDebts([...debts, newDebt]);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-4 sm:p-6 md:p-8 space-y-6">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Add New Debt</h1>
            <button
              onClick={() => setIsFormCollapsed(!isFormCollapsed)}
              className="text-gray-500 hover:text-gray-700 bg-white border-2 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
            >
              {isFormCollapsed ? (
                <Maximize2 size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          </div>

          <AnimatePresence>
            {!isFormCollapsed && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Lender
                    </label>
                    <input
                      {...register("lender", {
                        required: "Lender is required",
                      })}
                      className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:outline-none"
                      placeholder="Enter lender name"
                    />
                    {errors.lender && (
                      <p className="mt-1 text-sm text-red-500 font-bold">
                        {errors.lender.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Amount Owed
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("amountOwed", {
                        required: "Amount is required",
                        min: { value: 0, message: "Amount must be positive" },
                      })}
                      className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:outline-none"
                      placeholder="Enter amount"
                    />
                    {errors.amountOwed && (
                      <p className="mt-1 text-sm text-red-500 font-bold">
                        {errors.amountOwed.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("interestRate", {
                        required: "Interest rate is required",
                        min: { value: 0, message: "Rate must be positive" },
                      })}
                      className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:outline-none"
                      placeholder="Enter interest rate"
                    />
                    {errors.interestRate && (
                      <p className="mt-1 text-sm text-red-500 font-bold">
                        {errors.interestRate.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Due Date
                  </label>
                  <Controller
                    control={control}
                    name="dueDate"
                    rules={{ required: "Due date is required" }}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:outline-none"
                        placeholderText="Select due date"
                        dateFormat="MMMM d, yyyy"
                      />
                    )}
                  />
                  {errors.dueDate && (
                    <p className="mt-1 text-sm text-red-500 font-bold">
                      {errors.dueDate.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="px-4 py-2 bg-white border-2 border-black rounded-lg font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 border-2 border-black rounded-lg font-bold text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                  >
                    Submit
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Debt List</h2>
            <button
              onClick={() => setIsTableCollapsed(!isTableCollapsed)}
              className="text-gray-500 hover:text-gray-700 bg-white border-2 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
            >
              {isTableCollapsed ? (
                <Maximize2 size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          </div>

          <AnimatePresence>
            {!isTableCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="overflow-x-auto">
                  {/* Mobile View */}
                  <div className="md:hidden space-y-4">
                    {debts.map((debt) => (
                      <motion.div
                        key={debt.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-white border-2 border-black rounded-lg p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-bold">{debt.lender}</div>
                          <div className="flex space-x-2">
                            <button className="p-1 bg-blue-500 text-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]">
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() =>
                                setDebts(debts.filter((d) => d.id !== debt.id))
                              }
                              className="p-1 bg-red-500 text-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-bold text-gray-500">
                              Amount:
                            </span>
                            <span className="ml-2">
                              ${debt.amountOwed.toFixed(2)}
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-gray-500">
                              Rate:
                            </span>
                            <span className="ml-2">{debt.interestRate}%</span>
                          </div>
                          <div className="col-span-2">
                            <span className="font-bold text-gray-500">
                              Due:
                            </span>
                            <span className="ml-2">
                              {debt.dueDate.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:block">
                    <table className="min-w-full border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <thead className="bg-gray-50 border-b-2 border-black">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                            Debt ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                            Lender
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                            Amount Owed
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                            Interest Rate
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                            Due Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y-2 divide-black">
                        {debts.map((debt) => (
                          <motion.tr
                            key={debt.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                              {debt.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                              {debt.lender}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                              ${debt.amountOwed.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                              {debt.interestRate}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                              {debt.dueDate.toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button className="p-1 bg-blue-500 text-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]">
                                  <Pencil size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    setDebts(
                                      debts.filter((d) => d.id !== debt.id)
                                    )
                                  }
                                  className="p-1 bg-red-500 text-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
export default Debts;
