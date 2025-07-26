import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { User } from "lucide-react";
const PiePlayerTeam = ({ data }) => {
  const colors = [
    "#f0f9ff",
    "#e0f2fe",
    "#bae6fd",
    "#7dd3fc",
    "#38bdf8",
    "#0ea5e9",
    "#0284c7",
    "#0369a1",
    "#075985",
    "#0c4a6e",
  ];
  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="flex p-2 rounded-md items-center justify-center font-bold text-sm bg-white">
          {payload[0].name}: {payload[0].value}
          <User width={20} />
        </div>
      );
    }
    return null;
  };
  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value">
        {data.map(({ value }, index) => {
          return <Cell key={index} fill={colors[value]} />;
        })}
      </Pie>
     
      <Tooltip content={customTooltip}></Tooltip>
    </PieChart>
  );
};

export default PiePlayerTeam;
