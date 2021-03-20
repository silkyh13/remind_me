import { createMuiTheme } from "@material-ui/core/styles";
export const theme = createMuiTheme({
  palette: {
    //color of everything else besides background- dark grey
    primary: {
      main: "#B1B1B1",
    },
    //light grey
    primaryTwo: {
      main: "#EDEDED",
    },
    secondary: {
      main: "#FEC8D8",
    },
    //background = blue
    background: {
      default: "white",
    },
  },
});
