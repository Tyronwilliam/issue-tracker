"use client";
import { Card } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueChart = ({ inProgress, closed, open }: Props) => {
  const data = [
    { label: "Ouvert", value: open },
    { label: "Fait", value: closed },
    { label: "En cours", value: inProgress },
  ];
  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />{" "}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
