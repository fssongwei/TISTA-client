import * as React from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import FormControl from "@mui/material/FormControl";

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
        startText="Update Date"
        value={selectedDates}
        onChange={(newSelectedDates) => {
          setSelectedDates(newSelectedDates);
        }}
        renderInput={(startProps, endProps) => {
          return (
            <FormControl sx={{ m: 1, width: 160 }}>
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
                }}
                children={[]}
              />

              {/* <TextField variant="standard" {...startProps} /> */}
              {/* <TextField {...endProps} /> */}
            </FormControl>
          );
        }}
      />
    </LocalizationProvider>
  );
}
