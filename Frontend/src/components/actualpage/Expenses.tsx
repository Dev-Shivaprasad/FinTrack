import DataManager from "./DataManager";
import { ExpenseDbSchema, GetUserDetails } from "../utils/DbSchema";
import { BaseURL, Expense } from "../utils/DBLinks";

export default function ExpensesPage() {
  return (
    <DataManager<ExpenseDbSchema>
      title="Expense"
      baseURL={BaseURL}
      endpoints={{
        getByUserId: Expense.GetByUserId,
        post: Expense.Post,
        put: Expense.Put,
        delete: Expense.Delete,
      }}
      getUserId={GetUserDetails().user_id}
      fields={[
        {
          name: "category",
          label: "Category",
          type: "text",
          required: true,
        },
        {
          name: "amount",
          label: "Amount",
          type: "number",
          required: true,
          min: 0,
        },
        {
          name: "dateSpent",
          label: "Date Spent",
          type: "date",
        },
        {
          name: "isFixed",
          label: "Fixed Expense",
          type: "boolean",
        },
      ]}
      idField="expenseId"
      displayFields={[
        {
          name: "category",
          label: "Category",
          format: (value) => value,
        },
        {
          name: "amount",
          label: "Amount",
          format: (value) => `₹ ${value.toLocaleString()}`,
        },
        {
          name: "isFixed",
          label: "Fixed Income",
          format: (value) => (value ? "Yes" : "No"),
        },
        {
          name: "createdAt",
          label: "Date",
          format: (value) => new Date(value).toDateString(),
        },
      ]}
      defaultValues={{
        userId: "",
        category: "",
        amount: null,
        isFixed: null,
      }}
    />
  );
}
