import React, { useEffect, useState } from "react";
import {
  Drawer,
  Typography,
  Box,
  Button,
  Avatar,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { useStyles } from "./styles";
import feathersApp from "../../feathers";
import { selectUser } from "../../state/slices/user";
import { useSelector } from "react-redux";
const Settings = (props) => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    setReminder(user.value.needReminder);
  }, [user]);

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
        <FormControlLabel
          mt={2}
          mb={2}
          label="Reminder"
          control={
            <Switch
              onChange={(e) => {
                console.log(e.target.checked);
                feathersApp
                  .service("users")
                  .update(user.value._id, {
                    ...user.value,
                    needReminder: e.target.checked,
                  })
                  .then((res) => {
                    console.log(res);
                    setReminder(!e.target.checked);
                  })
                  .catch((err) => console.error(err));
              }}
              variant="contained"
              name="reminder"
              color="primary"
              checked={reminder}
            ></Switch>
          }
        />

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
