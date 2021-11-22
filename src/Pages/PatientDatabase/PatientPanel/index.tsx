import * as React from "react";
import Box from "@mui/material/Box";
import "./index.scss";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import RoomIcon from "@mui/icons-material/Room";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import PersonIcon from "@mui/icons-material/Person";

const PatientPanel = ({ patientId }: { patientId: string | null }) => {
  console.log(patientId);
  if (!patientId) {
    return <></>;
  }
  return (
    <Box
      sx={{
        background: "white",
        height: "100%",
        borderRadius: "15px",
        px: "40px",
      }}
      className="patient-panel"
    >
      <Box
        sx={{
          mt: "36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/default-avatar.png" className="avatar" alt="avatar" />
        <h4 className="name" style={{ marginTop: "24px" }}>
          Emily Lee
        </h4>
      </Box>
      <Box sx={{ mt: "10px" }}>
        <Box className="record">
          <ContactPageIcon />
          Patient ID: {patientId}
        </Box>
        <Box className="record">
          <PhoneIphoneIcon />
          {"607-123-456"}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box className="record">
            <RoomIcon />
            {"Ithaca, NY"}
          </Box>
          <Box className="record">
            <AccessibilityIcon />
            {"Female"}
          </Box>
        </Box>
        <Box className="record">
          <PersonIcon />
          {"05/11/1985 Age 36"}
        </Box>
      </Box>
      <Box className="history" sx={{ mt: "55px" }}>
        <h4 className="title">Claim History</h4>
      </Box>
    </Box>
  );
};

export default PatientPanel;
