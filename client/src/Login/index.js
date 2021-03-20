import React from "react";
import { Box, Button } from "@material-ui/core";
import { selectUser } from "../state/slices/user";
import { useSelector } from "react-redux";
const Login = () => {
  //get the log in and log out functionality
  const user = useSelector(selectUser);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button
        variant="contained"
        color="secondary"
        href="http://localhost:3030/oauth/google"
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
