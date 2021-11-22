import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
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

const TabButton = ({
  isActive,
  Icon,
  to,
}: {
  isActive?: boolean;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  to: string;
}) => {
  const background = isActive ? "#4861AD" : "transparent";
  const color = isActive ? "white" : "#4861AD";
  return (
    <IconButton
      sx={{ mr: 0 }}
      component={Link}
      to={to}
      size="large"
      className="icon-button"
      style={{ background }}
    >
      <Icon style={{ color }} sx={{ fontSize: 35 }} />
    </IconButton>
  );
};

const Header = ({ title }: { title?: string }) => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="header">
      <div className="logo">Logo</div>
      <div className="button-group">
        <TabButton
          isActive={location.pathname === "/"}
          Icon={StorageIcon}
          to="/"
        />
        <TabButton
          isActive={location.pathname === "/upload"}
          Icon={UploadFileRoundedIcon}
          to="/upload"
        />
        <TabButton isActive={false} Icon={HistoryIcon} to="/" />
      </div>
    </div>
  );
};

export default Header;
