import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { MainStats, useMediaItemsList } from "../../../api/hook";

interface ItemsTableProps {
  stats: MainStats
}

const ItemsTable = ({ stats }: ItemsTableProps) => {
  const { data: items } = useMediaItemsList();
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Daily Media Items Requests
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Requests #</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.filePath}>
              <TableCell>{item.title}</TableCell>
              <TableCell align="right">
                {stats.mediaItemsDaily[item.filePath]?.requests}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ItemsTable;
