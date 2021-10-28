import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Copyright = ({ company, link }: { company?: string; link?: string }) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {link ? (
        <Link color="inherit" href={link}>
          {company + " " || ""}
        </Link>
      ) : (
        <>{company + " " || ""}</>
      )}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = ({
  company,
  link,
  text,
}: {
  company?: string;
  link?: string;
  text?: string;
}) => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        {text && (
          <Typography variant="h6" align="center" gutterBottom>
            {text}
          </Typography>
        )}
        <Copyright company={company} link={link} />
      </Container>
    </Box>
  );
};

export default Footer;
