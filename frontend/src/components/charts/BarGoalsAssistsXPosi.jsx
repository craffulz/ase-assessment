import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle,
} from "recharts";

const BarGoalsAssistsXPosi = ({ data }) => {
  console.log("showw", data);
  return (
    <BarChart width={300} height={300} data={data}>
      <Bar
        dataKey="goals"
        fill="#10b981"
        activeBar={<Rectangle fill="gold" stroke="purple" />}
      />
      <Bar
        dataKey="assists"
        fill="#f97316"
        activeBar={<Rectangle fill="pink" stroke="purple" />}
      />
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="position" />
      <YAxis />
      <Tooltip cursor={{ fill: "transparent" }} />
    </BarChart>
  );
};

export default BarGoalsAssistsXPosi;
