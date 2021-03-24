import React, { useState, useEffect } from "react";
import moment from "moment";
import jstz from "jstz";
import momentTimezone from "moment-timezone";
import {
  Modal,
  Typography,
  Paper,
  TextField,
  Box,
  Grid,
  Button,
  Chip,
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import { selectDate, setDate } from "../../state/slices/date";
import { toggleModal, stateOfModal } from "../../state/slices/modal";
import { pushEvents, stateOfEvents } from "../../state/slices/events";
import { selectUser } from "../../state/slices/user";
import { useSelector, useDispatch } from "react-redux";
import { useStyles } from "./styles";
import feathersApp from "../../feathers";
import Event from "./Event";
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const DateModal = () => {
  const date = useSelector(selectDate);
  const user = useSelector(selectUser);
  const [startTime, setStartTime] = useState("2021-02-10T01:00");
  const [endTime, setEndTime] = useState("2021-02-10T01:00");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [invitee, setInvitee] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [entered, setEntered] = useState(null);
  const [emailAddresses, setEmailAddresses] = useState([]);
  const modalStorage = useSelector(stateOfModal);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [timeZone, setTimeZone] = useState("");
  const convertToLocalISO = (date) => {
    const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    return new Date(date - tzoffset).toISOString().slice(0, 16);
  };
  useEffect(() => {
    var tz = jstz.determine();
    var zone = tz.name();
    setTimeZone(zone);
  }, []);
  useEffect(() => {
    if (modalStorage.value === false) {
      setStartTime(new Date(date.value).toISOString().slice(0, 16));
      setEndTime(new Date(date.value).toISOString().slice(0, 16));
    }
    console.log("made it here");
  }, [date]);

  useEffect(() => {
    if (new Date(startTime) > new Date(endTime)) {
      const newDate = convertToLocalISO(
        moment(new Date(startTime)).add(30, "m").toDate()
      );
      console.log("start time", startTime, "end time", newDate);
      setEndTime(newDate);
      dispatch(setDate(startTime));
    }
  }, [startTime]);

  useEffect(() => {
    if (new Date(startTime) > new Date(endTime)) {
      const newDate = convertToLocalISO(
        moment(new Date(endTime)).subtract(30, "m").toDate()
      );
      console.log("start time", newDate, "end time", endTime);
      setStartTime(newDate);
      dispatch(setDate(newDate));
    }
  }, [endTime]);

  useEffect(() => {
    if (modalStorage.value) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [modalStorage.value]);
  useEffect(() => {
    let elem = document.getElementById("invite");

    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        setEntered(true);
      }
    };
    if (elem) {
      elem.addEventListener("keydown", listener);
    }
  }, [openModal]);

  useEffect(() => {
    if (entered) {
      if (validateEmail(invitee)) {
        setEmailAddresses([...emailAddresses, invitee]);
        setInvitee("");
        setEntered(null);
      } else {
        setEntered(false);
      }
    }
  }, [entered]);
  const handleDelete = (index) => {
    let temp = emailAddresses;
    emailAddresses.splice(index, 1);
    setEmailAddresses([...emailAddresses]);
  };
  return (
    <Modal
      className={classes.modal}
      open={modalStorage.value}
      onClose={() => dispatch(toggleModal())}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {modalStorage.eventInformation.length < 1 ? (
        <Paper variant="outlined" elevation={3} className={classes.modalPaper}>
          <Grid container>
            <Grid container item xs={12} justify="center">
              <Typography variant="h6">
                {new Date(date.value).toDateString()}
              </Typography>
            </Grid>
            <Grid container item xs={12} justify="center">
              <TextField
                label="Event Name"
                className={classes.textField}
                onChange={(e) => setTitle(e.target.value)}
              >
                {title}
              </TextField>
            </Grid>
            <Grid container item xs={12} justify="center">
              <TextField
                className={classes.textField}
                type="datetime-local"
                value={startTime}
                label="Start"
                onChange={(e) => {
                  setStartTime(e.target.value);
                  dispatch(setDate(e.target.value.toString()));
                }}
              />
            </Grid>
            <Grid container item xs={12} justify="center">
              <TextField
                className={classes.textField}
                type="datetime-local"
                value={endTime}
                label="End"
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              />
            </Grid>
            <Grid container item xs={12} justify="center">
              <TextField
                className={classes.textField}
                id="standard-basic"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid container item xs={12} justify="center">
              <TextField
                error={entered === false ? true : false}
                className={classes.textField}
                id="invite"
                label="invite"
                value={invitee}
                onChange={(e) => setInvitee(e.target.value)}
              />
            </Grid>
            <Grid container item xs={12} justify="center">
              <Box className={classes.textField}>
                {emailAddresses.map((data, i) => {
                  return (
                    <Chip
                      label={data}
                      onDelete={(e) => {
                        handleDelete(i);
                      }}
                      icon={<FaceIcon />}
                    />
                  );
                })}
              </Box>
            </Grid>
            <Grid container item xs={12} justify="center">
              <Box width="250px" display="flex" justifyContent="flex-end">
                <Button
                  onClick={() => {
                    feathersApp
                      .service("events")
                      .create({
                        title,
                        startTime,
                        endTime,
                        description,
                        userId: user.value._id,
                        timeZone,
                        sentReminder: false,
                      })
                      .then((res) => {
                        // Save event to redux
                        dispatch(
                          pushEvents({
                            title,
                            start: startTime,
                            end: endTime,
                            description,
                            timeZone,
                          })
                        );
                        dispatch(toggleModal());
                      })
                      .catch((err) => console.error(err));
                  }}
                >
                  Add
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Event />
      )}
    </Modal>
  );
};

export default DateModal;
