import * as React from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import "./index.scss";

export default function BasicDateRangePicker({
  selectedDates,
  setSelectedDates,
}: {
  selectedDates: DateRange<Date>;
  setSelectedDates: React.Dispatch<React.SetStateAction<DateRange<Date>>>;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Updated Date"
        value={selectedDates}
        onChange={(newSelectedDates) => {
          setSelectedDates(newSelectedDates);
        }}
        renderInput={(startProps, endProps) => {
          return (
            <FormControl className="date-range-picker">
              <TextField
                variant="standard"
                onFocus={startProps.inputProps?.onFocus}
                InputProps={{
                  readOnly: true,
                }}
                select={true}
                SelectProps={{
                  value: [],
                  renderValue: (selected) => startProps.label,
                  displayEmpty: true,
                  sx: {
                    height: "40px",
                    border: "none",
                    pl: "10px",
                    background: "#4861AD",
                    color: "white",
                    borderRadius: "10px",
                  },
                }}
                children={[]}
              />
            </FormControl>
          );
        }}
      />
    </LocalizationProvider>
  );
}
