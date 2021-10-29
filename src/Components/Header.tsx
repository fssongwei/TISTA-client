import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const Header = ({ title }: { title?: string }) => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton sx={{ mr: 2 }} component={Link} to="/">
          <HomeIcon style={{ color: "white" }} />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          {title || "Default Title"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
