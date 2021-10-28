import * as React from "react";
import Container from "@mui/material/Container";
import Search from "./Search";
import PatientTable from "./PatientTable";
import Box from "@mui/material/Box";
import "./index.css";

export default function PatientDatabase() {
  const [search, setSearch] = React.useState("");
  return (
    <Container
      sx={{ py: 8, display: "flex", flexDirection: "column", flex: "1" }}
      maxWidth="lg"
    >
      <Box sx={{ pb: 3 }}>
        <Search search={search} setSearch={setSearch} />
      </Box>

      <PatientTable search={search} />
    </Container>
  );
}
