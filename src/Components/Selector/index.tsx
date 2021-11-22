import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./index.scss";
import { SxProps } from "@material-ui/system";
import { Theme } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      //   width: 160,
    },
  },
};

const Selector = ({
  options,
  selectedItem,
  setSelectedItem,
  label,
  sx,
}: {
  options: string[];
  selectedItem: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  sx?: SxProps<Theme> | undefined;
}) => {
  const handleChange = (event: SelectChangeEvent<typeof selectedItem>) => {
    const {
      target: { value },
    } = event;
    setSelectedItem(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ ...sx }}>
        <Select
          multiple
          value={selectedItem}
          onChange={handleChange}
          renderValue={(selected) => label}
          MenuProps={MenuProps}
          displayEmpty
          variant="outlined"
          sx={{
            height: "40px",
            border: "none",
            m: "0",
            background: "#4861AD",
            color: "white",
            borderRadius: "10px",
          }}
        >
          {options.map((name) => (
            <MenuItem key={name} value={name} sx={{ height: "40px" }}>
              <Checkbox checked={selectedItem.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Selector;
