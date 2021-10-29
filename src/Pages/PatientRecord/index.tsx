import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { match } from "react-router-dom";
import RecordTable from "./RecordTable";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Upload from "./Upload";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

export default function PatientDatabase({
  match,
}: {
  match: match<{ id: string }>;
}) {
  const patientId = match.params.id;
  return (
    <Container
      sx={{ py: 8, display: "flex", flexDirection: "column", flex: "1" }}
      maxWidth="lg"
    >
      <Box sx={{ pb: 2 }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<KeyboardReturnIcon />}
          component={Link}
          to="/"
        >
          back to patient database
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Grid container spacing={2} sx={{ flex: "1" }}>
          <Grid item xs={3}>
            Patient Information: {patientId}
          </Grid>
          <Grid
            item
            xs={9}
            sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
          >
            <Stack spacing={2} direction="row" sx={{ py: 2 }}>
              <Upload />
              <Button variant="contained">Run Analysis</Button>
            </Stack>
            <RecordTable patientId={patientId} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
