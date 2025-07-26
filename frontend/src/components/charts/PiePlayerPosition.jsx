import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { User } from "lucide-react";
const PiePlayerPosition = ({ data }) => {
  const colors = [
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#f97316",
    "#06b6d4",
    "#84cc16",
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
        {data.map((entry, index) => {
          return <Cell key={index} fill={colors[index]} />;
        })}
      </Pie>
     
      <Tooltip content={customTooltip}></Tooltip>
    </PieChart>
  );
};

export default PiePlayerPosition;
