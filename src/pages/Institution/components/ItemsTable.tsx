import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { MainStats, useGlamMediaItems } from "../../../api/hook";
import sub from "date-fns/sub";
import format from "date-fns/format";
import { MediaItem } from "../../../api/app";
import { useRouteMatch } from "react-router-dom";

interface ItemsTableProps {
  stats: MainStats;
}

function sortItemsByStats(
  items: MediaItem[],
  stats: {
    [filePath: string]: number;
  }
) {

  return [...items].sort((a, b) => {
    return stats[b.filePath] - stats[a.filePath]
  });
}

const ItemsTable = ({ stats }: ItemsTableProps) => {
  const yesterday = sub(new Date(), { days: 1 });
  const aWeekAgo = sub(yesterday, { days: 6 });
  const { params } = useRouteMatch<{ glamId: string }>();
  const { data: items } = useGlamMediaItems(params.glamId);
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Weekly Media Items Requests{" "}
        <Typography color="textSecondary">
          {format(aWeekAgo, "dd MMM")} - {format(yesterday, "dd MMM")}
        </Typography>
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Requests #</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items && sortItemsByStats(items, stats.mediaItemsWeeklySum).map((item) => (
            <TableRow key={item.filePath}>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right">
                {stats.mediaItemsWeeklySum[item.filePath]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ItemsTable;
