import React from "react";
import { Drawer, Typography, Box, Button, Avatar } from "@material-ui/core";
import { useStyles } from "./styles";
import feathersApp from "../../feathers";
import { selectUser } from "../../state/slices/user";
import { useSelector } from "react-redux";
const Settings = (props) => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <Drawer
      className={classes.root}
      anchor="left"
      variant="permanent"
      open={props.open}
    >
      <Box
        width="10vw"
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{ backgroundColor: "#505980", height: "100%" }}
      >
        <Typography className={classes.settingsElement}>
          <Avatar
            alt="Remy Sharp"
            src={user.isRetrieved && user.value ? user.value.avatar : ""}
          />
        </Typography>
        <Typography className={classes.settingsElement}>
          {user.isRetrieved && user.value
            ? user.value.first_name + " " + user.value.last_name
            : ""}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            feathersApp
              .logout()
              .then((res) => {
                props.history.push("/login");
              })
              .catch((err) => console.error(err));
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Settings;
