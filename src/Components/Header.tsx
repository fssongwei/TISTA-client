import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = ({ title }: { title?: string }) => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          {title || "Default Title"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
