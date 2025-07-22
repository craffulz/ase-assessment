import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
const ChartPie = ({ data }) => {
  console.log("[PIE]", data);

  return (
    <div>
      <ResponsiveContainer width={300} height="100%">
        <PieChart>
          <Pie data={data} dataKey="value"></Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPie;
