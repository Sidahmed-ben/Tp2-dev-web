import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function MyTable(props) {
  const { dataToSend } = props;
  const columns = dataToSend.columns.slice(0, -1);
  const values = dataToSend.value.slice(1, -1);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ margin: 0 }} aria-label="simple table">
        <TableBody>
          {columns.map((col, ind) => (
            <TableRow
              key={col}
              sx={{
                "&:last-child td, &:last-child th": { border: 0, margin: 0 },
              }}
            >
              <TableCell
                align="left"
                sx={{ fontSize: 20 }}
                component="th"
                scope="row"
              >
                {col}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: 20 }}>
                {values[ind]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
