import React, { useState, useEffect } from "react";
import { Box, Typography, Drawer } from "@material-ui/core";
import Settings from "./Settings";
import CalendarTasks from "./Calendar";
import DateModal from "./Modal";
import withAuth from "../utils/withAuthComponent";

const Home = (props) => {
  return (
    <>
      <Box
        pl="10vw"
        pt="5vh"
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <CalendarTasks />
        <DateModal />
      </Box>
      <Box>
        <Settings {...props} />
      </Box>
    </>
  );
};

export default withAuth(Home);
