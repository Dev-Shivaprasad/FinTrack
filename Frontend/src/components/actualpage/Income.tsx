import { BaseURL, Income } from "../utils/DBLinks";
import { GetUserDetails, IncomeDbSchema } from "../utils/DbSchema";
import DataManager from "./DataManager";

export default function IncomesPage() {
  return (
    <DataManager<IncomeDbSchema>
      title="Income"
      baseURL={BaseURL}
      endpoints={{
        getByUserId: Income.GetByUserId,
        post: Income.Post,
        put: Income.Put,
        delete: Income.Delete,
      }}
      getUserId={GetUserDetails().user_id}
      fields={[
        {
          name: "source",
          label: "Source",
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
          name: "isFixed",
          label: "Fixed Income",
          type: "boolean",
        },
      ]}
      idField="incomeId"
      displayFields={[
        {
          name: "source",
          label: "Source",
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
        source: "",
        amount: null,
        isFixed: false,
      }}
    />
  );
}
