import React, { useMemo } from 'react';
import clsx from 'clsx';
import { useRouteMatch } from 'react-router-dom';
import { useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DateFormat } from '../../api/wikipedia';
import { useMediaItemStats, useGlamMediaItem } from '../../api/hook';
import { useStyles } from './styles';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

const MediaItem = () => {
  const { params } = useRouteMatch<{ glamId: string; filePath: string }>();
  const theme = useTheme();
  const classes = useStyles();

  const filePath = decodeURIComponent(params.filePath);
  const { data: fileData } = useGlamMediaItem(params.glamId, filePath);
  const { data } = useMediaItemStats(filePath);
  const chartData = useMemo(() => {
    if (data) {
      const { biweekly } = data;
      if (biweekly.length === 0) {
        return [];
      }
      const chartData = [];
      const startIndex = biweekly.length - 7 > -1 ? biweekly.length - 7 : 0;
      for (let i = startIndex; i < biweekly.length; i++) {
        chartData.push({
          name: format(
            parse(biweekly[i].timestamp, DateFormat, new Date()),
            'dd MM'
          ),
          current: biweekly[i].requests,
          previous: biweekly[i - 7]?.requests,
        });
      }
      return chartData;
    }
  }, [data]);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography component='h1' variant='h5' gutterBottom>
          {fileData?.title}
        </Typography>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          {chartData && (
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
                <XAxis dataKey='name' stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Line
                  type='monotone'
                  dataKey='current'
                  stroke={theme.palette.primary.main}
                  dot={false}
                />
                <Line
                  type='monotone'
                  dataKey='previous'
                  stroke={theme.palette.primary.light}
                  dot={false}
                  strokeDasharray='5 5'
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MediaItem;
