import axios from "axios";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  YAxis,
  XAxis,
  PieChart,
  Pie,
  Legend,
  Cell,
  RadialBarChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadialBar,
} from "recharts";
import { AuthHeaders, BaseURL, getreportdata } from "../utils/DBLinks";
import { GetUserDetails, ReportDBSchema } from "../utils/DbSchema";
import Button from "../Button";

interface T {
  fill?: "";
}

interface ChartComponentProps extends T {
  Size: number;
  Data: ReportDBSchema[];
  className?: string;
}

const COLORS = [
  "#FF0000", // 0th - Red
  "#0088FE", // Blue
  "#FFBB28", // Yellow
  "#FF8042", // Orange
  "#AA00FF", // Purple
];
const tooltipstyle = {
  color: "var(--color-text)",
  backgroundColor: "var(--color-accent)",
  borderRadius: "20px",
};

export default function Reports() {
  const [Reportdata, setReportdata] = useState<ReportDBSchema[]>([
    {
      amount: 0,
      name: "",
    },
  ]);

  const [Size, setSize] = useState<number>(50);
  const [VisualValue, setVisualsetValue] = useState<number>(1);
  useEffect(() => {
    axios
      .get(BaseURL + getreportdata.Get + GetUserDetails().user_id, AuthHeaders)
      .then((data) => {
        const coloredData = data.data.map(
          (item: ReportDBSchema, index: number) => ({
            ...item,
            fill: COLORS[index % COLORS.length], // Cycle through colors
          })
        );
        setReportdata(coloredData);
      })
      .catch((err) => console.log(err));
  }, []);

  const visualtobeshown = [
    {
      number: 1,
      element: BarchartComponent,
      chartname: "Bar chart",
    },
    {
      number: 2,
      element: PiechartComponent,
      chartname: "Pie chart",
    },
    {
      number: 3,
      element: RadialBarChartComponent,
      chartname: "Radial Bar Chart",
    },
    {
      number: 4,
      element: RadarChartComponent,
      chartname: "Radar Chart",
    },
  ];
  const VisualComponent = visualtobeshown.find(
    (dataa) => dataa.number === VisualValue
  )?.element;

  return (
    <div className="text-text flex flex-col  justify-evenly items-center h-screen w-full">
      <div className="flex gap-2 ">
        {visualtobeshown.map((visualdata, index) => (
          <Button
            key={index}
            title={visualdata.chartname}
            action={() => setVisualsetValue(visualdata.number)}
          />
        ))}
      </div>

      {VisualComponent && (
        <VisualComponent Data={Reportdata} Size={Size} className="mb-10" />
      )}

      <div className="absolute bottom-10">
        <span className="flex flex-col items-center justify-center mt-10">
          ReSize Chart
          <input
            type="range"
            name="size"
            id=""
            onChange={(e) => setSize(parseInt(e.currentTarget.value))}
            step={10}
            min={30}
            max={70}
            className="w-full"
          />
        </span>
      </div>
    </div>
  );
}

export function BarchartComponent({
  Data,
  Size,
  className,
}: ChartComponentProps) {
  return (
    <ResponsiveContainer
      width={`${Size}%`}
      height={`${Size}%`}
      className={className}
    >
      <BarChart data={Data}>
        <XAxis
          dataKey="name"
          tick={{ fill: COLORS[4] }}
          axisLine={{ stroke: COLORS[2] }}
          tickLine={{ stroke: COLORS[1] }}
        />
        <YAxis
          tick={{ fill: COLORS[4] }}
          axisLine={{ stroke: COLORS[2] }}
          tickLine={{ stroke: COLORS[1] }}
        />
        <Tooltip contentStyle={tooltipstyle} content={<CustomTooltip />} />
        <Bar
          dataKey="amount"
          isAnimationActive={true}
          animationDuration={800}
          animationEasing="ease-out"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PiechartComponent({
  Data,
  Size,
  className,
}: ChartComponentProps) {
  return (
    <ResponsiveContainer
      width={`${Size}%`}
      height={`${Size}%`}
      className={className}
    >
      <PieChart>
        <Pie
          data={Data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
          isAnimationActive={true}
          animationDuration={800}
          animationEasing="ease-out"
        >
          {Data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.fill || COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipstyle} content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function RadialBarChartComponent({
  Data,
  Size,
  className,
}: ChartComponentProps) {
  return (
    <ResponsiveContainer
      width={`${Size}%`}
      height={`${Size}%`}
      className={className}
    >
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="10%"
        outerRadius="80%"
        barSize={10}
        data={Data}
        startAngle={90}
        endAngle={-270}
      >
        <RadialBar
          dataKey="amount"
          background
          cornerRadius={20}
          label={{ position: "outside" }}
          isAnimationActive={true}
          animationDuration={800}
          animationEasing="ease-out"
        />

        <Tooltip contentStyle={tooltipstyle} content={<CustomTooltip />} />
        <Legend />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export function RadarChartComponent({
  Data,
  Size,
  className,
}: ChartComponentProps) {
  return (
    <ResponsiveContainer
      width={`${Size}%`}
      height={`${Size}%`}
      className={className}
    >
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={Data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar
          name="Reported Data"
          dataKey="amount"
          stroke={COLORS[0]}
          fill={COLORS[1]}
          fillOpacity={0.6}
          isAnimationActive={true}
          animationDuration={800}
          animationEasing="ease-out"
        />

        <Tooltip contentStyle={tooltipstyle} content={<CustomTooltip />} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "var(--color-accent)",
          borderRadius: "10px",
          padding: "10px",
          color: "var(--color-text)",
        }}
      >
        <p>
          <strong>{data.name}</strong>
        </p>
        <p>Amount: {data.amount}</p>
      </div>
    );
  }

  return null;
};
