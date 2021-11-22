import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { match } from "react-router-dom";
import ReviewDropdown from "./ReviewDropdown";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

export default function PatientDatabase({
  match,
}: {
  match: match<{ id: string }>;
}) {
  const reportId = match.params.id;
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
          to="/patient/1"
        >
          back to patient page
        </Button>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" gutterBottom component="div">
            Chance of fraud: 80%
          </Typography>
        </Box>
        <Box
          sx={{
            width: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          Review Result:
          <ReviewDropdown />
        </Box>
      </Box>
      <Box>
        <Typography variant="h5" gutterBottom component="div">
          Inference
        </Typography>
        <Skeleton animation={"wave"} />
        <Skeleton animation={"wave"} />
        <Skeleton animation={"wave"} />
        <Skeleton animation={"wave"} />
        <Skeleton animation={"wave"} />
      </Box>
      <Box sx={{ py: 2 }}>
        <Typography variant="h5" gutterBottom component="div">
          Claim
        </Typography>
        <Skeleton variant="rectangular" height={300} animation={"wave"} />
      </Box>
    </Container>
  );
}
