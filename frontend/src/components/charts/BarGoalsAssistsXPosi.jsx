import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle,
  Legend,
} from "recharts";

const BarGoalsAssistsXPosi = ({ data }) => {
  return (
    <BarChart width={300} height={300} data={data}>
      <Bar
        dataKey="goals"
        fill="#0284c7"
        activeBar={<Rectangle fill="#0284c7" stroke="purple" />}
      />
      <Bar
        dataKey="assists"
        fill="#7dd3fc"
        activeBar={<Rectangle fill="#7dd3fc" stroke="purple" />}
      />
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="position" />
      <YAxis />
      <Legend />
      <Tooltip cursor={{ fill: "transparent" }} />
    </BarChart>
  );
};

export default BarGoalsAssistsXPosi;
