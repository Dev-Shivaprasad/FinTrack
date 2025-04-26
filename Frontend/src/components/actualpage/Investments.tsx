"use client";

import { BaseURL, Investment } from "../utils/DBLinks";
import { GetUserDetails, InvestmentDbSchema } from "../utils/DbSchema";
import DataManager from "./DataManager";

export default function InvestmentsPage() {
  return (
    <DataManager<InvestmentDbSchema>
      title="Investment"
      baseURL={BaseURL}
      endpoints={{
        getByUserId: Investment.GetByUserId,
        post: Investment.Post,
        put: Investment.Put,
        delete: Investment.Delete,
      }}
      getUserId={GetUserDetails().user_id}
      fields={[
        {
          name: "category",
          label: "Investment Type",
          type: "select",
          required: true,
          options: [
            { value: "stocks", label: "Stocks" },
            { value: "bonds", label: "Bonds" },
            { value: "realestate", label: "Real Estate" },
            { value: "crypto", label: "Cryptocurrency" },
            { value: "mutualfund", label: "Mutual Fund" },
            { value: "exchangetradedfunds", label: "Exchange Traded Funds" },
            { value: "fixeddeposits", label: "Fixed Deposits" },
          ],
        },
        {
          name: "specficDetails",
          label: "Investment Details",
          type: "text",
          required: false,
        },
        {
          name: "amount",
          label: "Amount",
          type: "number",
          required: true,
          min: 0,
        },
        {
          name: "dateInvested",
          label: "Date Invested",
          type: "date",
          required: true,
        },
      ]}
      idField="investmentId"
      displayFields={[
        {
          name: "category",
          label: "Category",
          format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
        },
        {
          name: "specficDetails",
          label: "Details",
          format: (value) => value,
        },
        {
          name: "amount",
          label: "Amount",
          format: (value) => `₹ ${value.toLocaleString()}`,
        },
        {
          name: "dateInvested",
          label: "Date Invested",
          format: (value) => new Date(value).toDateString(),
        },
      ]}
      defaultValues={{
        userId: "",
        category: "",
        specficDetails: "",
        amount: 0,
        dateInvested: "",
      }}
    />
  );
}
