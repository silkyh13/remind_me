import React, { useState, useEffect } from "react";
import {
  Modal,
  Typography,
  Paper,
  TextField,
  Box,
  Grid,
  Button,
} from "@material-ui/core";
import { useStyles } from "../styles";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal, stateOfModal } from "../../../state/slices/modal";

const EventContent = () => {
  const classes = useStyles();
  const modalStorage = useSelector(stateOfModal);

  return (
    <Paper variant="outlined" elevation={3} className={classes.modalPaper}>
      <Grid container>
        <Grid container item xs={12} justify="center">
          <Typography variant="h6">
            {modalStorage.eventInformation.title}
          </Typography>
        </Grid>
        <Grid container item xs={12} justify="center">
          <Typography variant="h6">
            {modalStorage.eventInformation.description}
          </Typography>
        </Grid>
        <Grid container item xs={12} justify="center">
          <Typography variant="h6">
            {modalStorage.eventInformation.start}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default EventContent;
