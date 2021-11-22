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
  INACTIVE,
}

export default function PatientTable({
  tableData,
  loading,
  selectedPatient,
}: {
  tableData: TableData | null;
  loading: boolean;
  selectedPatient: Function;
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
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Patient Name</TableCell>
              <TableCell align="center">Update Date</TableCell>
              <TableCell align="center">Status</TableCell>

              {/* <TableCell align="center">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData.map((row) => (
                <TableRow
                  hover
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => selectedPatient(row.id)}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    {moment(row.update).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    <StatusIndicator status={row.status} />
                  </TableCell>
                  {/* <TableCell align="center">
                    <Link
                      to={`/patient/${row.id}`}
                      style={{ color: "black", fontWeight: 600 }}
                    >
                      View
                    </Link>
                  </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const StatusIndicator = ({ status }: { status: STATUS }) => {
  const statusLabel = ["Normal", "Reviewing", "Inactive"];
  const colors = ["#D6FFDC", "#FFFDD6", "#FFD6D6"];
  return (
    <span
      style={{
        background: colors[status],
        padding: "5px 10px 5px 10px",
        borderRadius: "20px",
        color: "#726E27",
        textAlign: "center",
      }}
    >
      {statusLabel[status]}
    </span>
  );
};
