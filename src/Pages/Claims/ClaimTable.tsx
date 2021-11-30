import * as React from "react";
import history from "../../utils/history";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableData } from "./fetchData";
import CircularProgress from "@mui/material/CircularProgress";

const riskLevels = ["Unlikely", "Low Risk", "Mid Risk", "High Risk"];
const riskLevelColors = ["#35A52B", "#DEAC2B", "#FE6B0C", "#DF3030"];

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
      <TableContainer className="table claim-table" sx={{ minHeight: 605 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Claim ID</TableCell>
              <TableCell align="center">Patient Name</TableCell>
              <TableCell align="center">File</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Reviewer</TableCell>
              <TableCell align="center">Risk Level</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData.map((row) => (
                <TableRow
                  hover
                  key={row.claimId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.claimId}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    <a
                      href={new URL(
                        row.filePath,
                        process.env.REACT_APP_API_BASE_URL
                      ).toString()}
                    >
                      Claim File.txt
                    </a>
                  </TableCell>
                  <TableCell align="center">N/A</TableCell>
                  <TableCell align="center">
                    N/A
                    {/* <StatusIndicator status={row.status} /> */}
                  </TableCell>
                  <TableCell align="center">
                    <Label
                      title={riskLevels[row.riskLevel]}
                      color={riskLevelColors[row.riskLevel]}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Link
                      to={`/report/${row.claimId}`}
                      style={{ fontWeight: 600 }}
                    >
                      View Report
                    </Link>
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

const Label = ({ title, color }: { title: string; color: string }) => {
  return (
    <span
      style={{
        background: color + "1A",
        padding: "5px 10px 5px 10px",
        borderRadius: "10px",
        color: color,
        textAlign: "center",
      }}
    >
      {title}
    </span>
  );
};

const getFileName = (filePath: string) => {
  let arr = filePath.split("/");
  return arr[arr.length - 1];
};
