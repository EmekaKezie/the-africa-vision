import { Box, TextField, Typography } from "@mui/material";
import { ChangeEventHandler, KeyboardEventHandler } from "react";

type sizeTypes = "small" | "medium";

type props = {
  children?: any;
  name?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  size?: sizeTypes;
  type?: React.InputHTMLAttributes<unknown>["type"];
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: KeyboardEventHandler<HTMLDivElement>;
  rows?: number;
  validate?: boolean;
  validationMessage?: string;
  style?: any;
  inputStyle?: any;
  fullWidth?: boolean;
  select?: boolean;
  selectedValue?: string;
};

export default function TextInput(props: props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          marginBottom: "2px",
          border: "0px solid gray",
          //height: "20px",
          fontSize: "13px",
          color: "#667085",
          fontWeight: "bold",
        }}>
        {!props.label ? null : props.label}
      </Typography>
      <TextField
        name={props.name}
        placeholder={
          !props.validationMessage ? props.placeholder : props.validationMessage
        }
        size={!props.size ? "medium" : props.size}
        //label={props.label ? props.label : null}
        type={!props.type ? "text" : props.type}
        fullWidth={!props.fullWidth ? false : true}
        value={props.value}
        multiline={!props.rows ? false : true}
        rows={props.rows}
        select={!props.select ? false : true}
        onChange={props.onChange}
        onKeyUp={props.onKeyUp}
        //autoFocus
        InputProps={{
          style: props.inputStyle,
          startAdornment: props.startIcon,
          endAdornment: props.endIcon,
          disableUnderline: true,
        }}
        style={props.style}
        SelectProps={{
          value: !props.selectedValue
            ? null
            : props.selectedValue,
        }}
        sx={{
          "& fieldset": {
            border: !props.validationMessage ? "none " : "1px solid red",
          },
          "&:hover": {
            border: "1px solid #A8518A",
            borderRadius: "5px",
          },
        }}>
        {!props.children ? null : props.children}
      </TextField>
    </Box>
  );
}
