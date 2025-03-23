"use client"

import { BaseURL, Income } from "../utils/DBLinks"
import { GetUserId, IncomeDbSchema } from "../utils/DbSchema"
import DataManager from "./DataManager"


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
      getUserId={GetUserId()}
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
            name: "Is Fixed",
            label: "Amount",
            type: "number",
            required: true,
            min: 0,
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
          format: (value) => `₹ ${value}`,
        },
        {
          name: "createdAt",
          label: "Date",
          format: (value) => new Date(value).toLocaleDateString(),
        },
      ]}
      defaultValues={{
        userId: "",
        source: "",
        amount: 0,
      }}
    />
  )
}

