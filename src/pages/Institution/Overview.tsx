import React from "react";
import clsx from "clsx";
import WeekChart from "./components/WeekChart";
import WeekTotal from "./components/WeekTotal";
import ItemsTable from "./components/ItemsTable";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useStats, useMediaItemsList } from "../../api/hook";
import { useStyles } from "./styles";

const Overview = () => {
  const { data: items } = useMediaItemsList();
  const { data: stats } = useStats(items);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <WeekChart stats={stats} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <WeekTotal stats={stats} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <ItemsTable stats={stats} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Overview;
