import axios from "axios";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";
import { AuthHeaders, BaseURL, getreportdata } from "../utils/DBLinks";
import { GetUserDetails, ReportDBSchema } from "../utils/DbSchema";

export default function Reports() {
  const [Reportdata, setReportdata] = useState<ReportDBSchema[]>([
    {
      amount: 0,
      name: "",
    },
  ]);
  useEffect(() => {
    axios
      .get(BaseURL + getreportdata.Get + GetUserDetails().user_id, AuthHeaders)
      .then((data) => {
        setReportdata(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-background flex justify-center items-center h-screen w-full">
      <ResponsiveContainer width="50%" height="50%">
        <BarChart data={Reportdata}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8874d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
