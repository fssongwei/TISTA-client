import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import StorageIcon from "@mui/icons-material/Storage";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import HistoryIcon from "@mui/icons-material/History";
import Button from "@mui/material/Button";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import "./Header.scss";
import { useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SettingsIcon from "@mui/icons-material/Settings";
import history from "../utils/history";

const TabButton = ({
  isActive,
  Icon,
  to,
  title,
}: {
  isActive?: boolean;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  to: string;
  title: string;
}) => {
  return (
    <Button
      variant="text"
      startIcon={<Icon />}
      className={`tab-button ${isActive ? "active" : ""}`}
      sx={{ mb: "15px" }}
      onClick={() => {
        history.push(to);
      }}
    >
      {title}
    </Button>
  );
};

const Header = ({ title }: { title?: string }) => {
  const location = useLocation();
  return (
    <div className="header">
      <div className="logo">Logo</div>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
      >
        <TabButton
          isActive={location.pathname === "/dashboard"}
          Icon={DashboardIcon}
          to="/"
          title="Dashboard"
        />
        <TabButton
          isActive={location.pathname === "/"}
          Icon={AccountBoxIcon}
          to="/"
          title="Patients"
        />
        <TabButton
          isActive={location.pathname === "/claims"}
          Icon={AssignmentIcon}
          to="/"
          title="Claims"
        />
        <TabButton
          isActive={location.pathname === "/upload"}
          Icon={AddBoxIcon}
          to="/upload"
          title="Add Claim"
        />
        <TabButton
          isActive={false}
          Icon={SettingsIcon}
          to="/"
          title="Setting"
        />
      </Box>
    </div>
  );
};

export default Header;
