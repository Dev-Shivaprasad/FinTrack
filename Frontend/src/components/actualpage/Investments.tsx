import DataManager from "./DataManager";
import { BaseURL, Investment } from "../utils/DBLinks";

const Investments = () => {
  const fields = [
    {
      name: "type",
      type: "text",
      label: "Type",
      placeholder: "Enter investment type",
      required: true,
    },
    {
      name: "amount",
      type: "number",
      label: "Amount",
      placeholder: "Enter amount",
      required: true,
      min: 0,
    },
    {
      name: "dateInvested",
      type: "date",
      label: "Date Invested",
      placeholder: "Select date invested",
      required: true,
    },
  ];

  return (
    <DataManager
      baseURL={BaseURL}
      endpoints={{
        get: Investment.GetByUserId,
        post: Investment.Post,
        put: Investment.Put,
        delete: Investment.Delete,
      }}
      fields={fields}
      title="Add New Investment"
      itemTitle="Investment List"
    />
  );
};

export default Investments;
