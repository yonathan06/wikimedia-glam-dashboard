import React from "react";
import Typography from "@material-ui/core/Typography";
import { MainStats } from "../../../api/hook";
import sub from "date-fns/sub";
import format from "date-fns/format";

interface WeekTotalProps {
  stats: MainStats
}

const WeekTotal = ({ stats }: WeekTotalProps) => {
  const yesterday = sub(new Date(), { days: 1 });
  const aWeekAgo = sub(yesterday, { days: 6 });
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Total
      </Typography>
      <Typography component="p" variant="h4">
        {stats.weeklySum}
      </Typography>
      <Typography color="textSecondary">
        {format(aWeekAgo, "dd MMM")} - {format(yesterday, "dd MMM")}
      </Typography>
    </>
  );
};

export default WeekTotal;
