"use client";

import { BaseURL, Savings } from "../utils/DBLinks";
import { GetUserDetails, SavingsDbSchema } from "../utils/DbSchema";
import DataManager from "./DataManager";
export default function SavingsPage() {
  return (
    <DataManager<SavingsDbSchema>
      title="Saving"
      baseURL={BaseURL}
      endpoints={{
        getByUserId: Savings.GetByUserId,
        post: Savings.Post,
        put: Savings.Put,
        delete: Savings.Delete,
      }}
      getUserId={GetUserDetails().user_id}
      fields={[
        {
          name: "goalName",
          label: "Goal Name",
          type: "text",
          required: true,
        },
        {
          name: "targetAmount",
          label: "Target Amount",
          type: "number",
          required: true,
          min: 0,
        },
        {
          name: "currentAmount",
          label: "Current Amount",
          type: "number",
          required: true,
          min: 0,
        },
      ]}
      idField="savingId"
      displayFields={[
        {
          name: "goalName",
          label: "Goal",
        },
        {
          name: "targetAmount",
          label: "Target",
          format: (value) => `₹ ${value.toLocaleString()}`,
        },
        {
          name: "currentAmount",
          label: "Current",
          format: (value) => `₹ ${value.toLocaleString()}`,
        },
        {
          name: "currentAmount",
          label: "goal amount to collect",
          format: (value, row) =>
            ((row?.targetAmount || 0) - value).toLocaleString(),
        },
      ]}
      defaultValues={{
        userId: "",
        goalName: "",
        targetAmount: null,
        currentAmount: null,
      }}
    />
  );
}
