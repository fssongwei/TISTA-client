import * as React from "react";
import {
  DataGrid,
  GridFilterModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import history from "../../utils/history";
import faker from "faker";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import { TableData } from "./fetchData";
import CircularProgress from "@mui/material/CircularProgress";

enum STATUS {
  NORMAL,
  REVIEWING,
  FRAUD,
}

export default function PatientTable({
  tableData,
  loading,
}: {
  tableData: TableData | null;
  loading: boolean;
}) {
  if (loading) {
    return (
      <Box
        style={{ flex: 1, width: "100%" }}
        sx={{
          minHeight: 605,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ flex: 1, width: "100%" }}>
      <TableContainer className="patient-table" sx={{ minHeight: 605 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Patient Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="left">Reviewer</TableCell>
              <TableCell align="left">Update Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData.map((row) => (
                <TableRow
                  hover
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell component="th" scope="row">
                  {row.name}
                </TableCell> */}
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="center">
                    <StatusIndicator status={row.status} />
                  </TableCell>
                  <TableCell align="left">{row.reviewer}</TableCell>
                  <TableCell align="left">
                    {moment(row.update).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    <Link
                      to={`/patient/${row.id}`}
                      style={{ color: "black", fontWeight: 600 }}
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Pagination
          count={10}
          color="primary"
          shape="rounded"
          size="large"
          hidePrevButton
          sx={{ py: "30px" }}
        />
      </Box> */}
    </div>
  );
}

const StatusIndicator = ({ status }: { status: STATUS }) => {
  const statusLabel = ["Normal", "Reviewing", "Fraud"];
  const colors = ["#D6FFDC", "#FFFDD6", "#FFD6D6"];
  return (
    <span
      style={{
        background: colors[status],
        padding: "5px 10px 5px 10px",
        borderRadius: "20px",
        color: "#726E27",
      }}
    >
      {statusLabel[status]}
    </span>
  );
};
