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
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import "./index.scss";
import fetchReport, { Report } from "./fetchReport";
import Label from "../../Components/Label";

const riskLevels = ["Unlikely", "Low Risk", "Mid Risk", "High Risk"];
const riskLevelColors = ["#35A52B", "#DEAC2B", "#FE6B0C", "#DF3030"];

export default function ReportPage({
  match,
}: {
  match: match<{ id: string }>;
}) {
  const [loading, setLoading] = React.useState(true);
  const [report, setReport] = React.useState<null | Report>(null);
  const claimId = match.params.id;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const resReport = await fetchReport(claimId);
        setReport(resReport);
      } catch {}
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Box style={{ height: "100%" }} className="report">
      <Container
        sx={{
          pt: "60px",
          display: "flex",
          flexDirection: "column",
          flex: "1",
          justifyContent: "center",
          alignItems: "center",
        }}
        maxWidth="lg"
        style={{ height: "100%" }}
        className="patient-database"
      >
        <Paper
          sx={{
            width: "95%",
            maxWidth: "1000px",
            background: "white",
            px: "70px",
            py: "60px",
            borderRadius: "15px",
            position: "relative",
          }}
          elevation={10}
        >
          <IconButton
            sx={{ position: "absolute", top: "25px", right: "25px" }}
            component={Link}
            to="/claims"
            size="large"
            className="icon-button"
          >
            <CancelIcon style={{ color: "#4861AD" }} sx={{ fontSize: 30 }} />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <h3 className="title" style={{ marginRight: "13px" }}>
              Report ID - {claimId}
            </h3>
            <Label
              title={riskLevels[parseInt(report!.riskLevel)]}
              color={riskLevelColors[parseInt(report!.riskLevel)]}
            />
          </Box>
          <Box className="info">
            <ul>
              <li>Patient Name: {report?.patientName}</li>
              <li>Patient ID: {report?.patientId}</li>
              <li>Review Status: {report?.reviewStatus}</li>
              <li>Comment: {report?.comment}</li>
            </ul>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
            className="filename"
          >
            <InsertDriveFileIcon
              sx={{ fontSize: "30px", color: "#5A5959", mr: "18px" }}
            />
            <a
              href={new URL(
                report!.claim,
                process.env.REACT_APP_API_BASE_URL
              ).toString()}
            >
              Claim File.txt
            </a>
          </Box>
          <hr />
          <Box sx={{ m: "40px" }}>
            <table className="table">
              <tr>
                <td className="table-title">Provider Name</td>
                <td className="table-value">{report?.providerName}</td>
              </tr>
              <tr>
                <td className="table-title">Facility Location</td>
                <td className="table-value">{report?.facilityLocation}</td>
              </tr>
              <tr>
                <td className="table-title">Net Value</td>
                <td className="table-value">{report?.netValue}</td>
              </tr>
              <tr>
                <td className="table-title">Bill Time Difference</td>
                <td className="table-value">{report?.billTimeDifference}</td>
              </tr>
            </table>
          </Box>
        </Paper>
      </Container>
    </Box>
  );

  // return (
  //   <Container
  //     sx={{ py: 8, display: "flex", flexDirection: "column", flex: "1" }}
  //     maxWidth="lg"
  //   >
  //     <Box sx={{ pb: 2 }}>
  //       <Button
  //         size="small"
  //         variant="outlined"
  //         startIcon={<KeyboardReturnIcon />}
  //         component={Link}
  //         to="/patient/1"
  //       >
  //         back to patient page
  //       </Button>
  //     </Box>

  //     <Box sx={{ display: "flex", alignItems: "center" }}>
  //       <Box sx={{ flex: 1 }}>
  //         <Typography variant="h5" gutterBottom component="div">
  //           Chance of fraud: 80%
  //         </Typography>
  //       </Box>
  //       <Box
  //         sx={{
  //           width: "300px",
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "flex-end",
  //         }}
  //       >
  //         Review Result:
  //         <ReviewDropdown />
  //       </Box>
  //     </Box>
  //     <Box>
  //       <Typography variant="h5" gutterBottom component="div">
  //         Inference
  //       </Typography>
  //       <Skeleton animation={"wave"} />
  //       <Skeleton animation={"wave"} />
  //       <Skeleton animation={"wave"} />
  //       <Skeleton animation={"wave"} />
  //       <Skeleton animation={"wave"} />
  //     </Box>
  //     <Box sx={{ py: 2 }}>
  //       <Typography variant="h5" gutterBottom component="div">
  //         Claim
  //       </Typography>
  //       <Skeleton variant="rectangular" height={300} animation={"wave"} />
  //     </Box>
  //   </Container>
  // );
}
