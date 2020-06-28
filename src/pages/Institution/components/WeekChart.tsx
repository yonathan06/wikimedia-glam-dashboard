import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MainStats } from "../../../api/hook";
import format from "date-fns/format";
import parse from "date-fns/parse";
import { DateFormat } from "../../../api/wikipedia";
import { useTheme } from "@material-ui/core/styles";

interface WeekChartProps {
  stats: MainStats
}

const WeekChart = ({ stats }: WeekChartProps) => {
  const theme = useTheme();
  const chartData = useMemo(() => {
    const { biweekly } = stats;
    if (biweekly.length === 0) {
      return [];
    }
    const chartData = [];
    for (let i = 7; i < 14; i++) {
      chartData.push({
        name: format(
          parse(biweekly[i].timestamp, DateFormat, new Date()),
          "dd MM"
        ),
        current: biweekly[i].requests,
        previous: biweekly[i - 7].requests,
      });
    }
    return chartData;
  }, [stats]);
  return (
    <ResponsiveContainer>
      <LineChart
        data={chartData}
        margin={{
          top: 16,
          right: 16,
          bottom: 0,
          left: 0,
        }}
      >
        <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
        <YAxis stroke={theme.palette.text.secondary} />
        <Line
          type="monotone"
          dataKey="current"
          stroke={theme.palette.primary.main}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="previous"
          stroke={theme.palette.secondary.main}
          dot={false}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeekChart;
