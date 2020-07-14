import React from 'react';
import WeekChart from './components/WeekChart';
import WeekTotal from './components/WeekTotal';
import ItemsTable from './components/ItemsTable';
import Grid from '@material-ui/core/Grid';
import { useStats, useGlamMediaItems } from '../../api/hook';
import { useRouteMatch } from 'react-router-dom';
import { AppPaper } from '../../components/AppPaper';

const Overview = () => {
  const { params } = useRouteMatch<{ glamId: string }>();
  const { data: items } = useGlamMediaItems(params.glamId);
  const { data: stats } = useStats(items);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <AppPaper>
          <WeekChart stats={stats} />
        </AppPaper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <AppPaper>
          <WeekTotal stats={stats} />
        </AppPaper>
      </Grid>
      <Grid item xs={12}>
        <AppPaper>
          <ItemsTable stats={stats} />
        </AppPaper>
      </Grid>
    </Grid>
  );
};

export default Overview;
