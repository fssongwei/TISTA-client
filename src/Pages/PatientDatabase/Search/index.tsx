import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import "./index.scss";

const Search = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [searchTerm, setSearchTerm] = React.useState(search);

  return (
    <Box
      component="form"
      sx={{ display: "flex", alignItems: "center" }}
      style={{
        maxWidth: "400px",
        width: "50%",
        border: "none",
        background: "white",
        borderRadius: "10px",
        height: "50px",
      }}
      className="search-bar"
    >
      <InputBase
        sx={{ flex: 1, px: " 15px" }}
        className="search-input"
        placeholder="Search Patient"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <IconButton
        type="submit"
        sx={{ ml: "15px" }}
        aria-label="search"
        // style={buttonStyle}
        onClick={(event) => {
          event.preventDefault();
          setSearch(searchTerm);
        }}
      >
        <SearchIcon sx={{ fontSize: 28 }} />
      </IconButton>
    </Box>
  );
};

export default Search;
