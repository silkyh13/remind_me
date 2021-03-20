import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Box } from "@material-ui/core";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { setDate } from "../../state/slices/date";
import {
  setEvents,
  pushEvents,
  stateOfEvents,
} from "../../state/slices/events";
import { toggleModal, addOrDisplayEvent } from "../../state/slices/modal";
import { useDispatch, useSelector } from "react-redux";
import feathersApp from "../../feathers";

const localizer = momentLocalizer(moment);

const CalendarTasks = ({ setOpen }) => {
  const dispatch = useDispatch();
  const eventsState = useSelector(stateOfEvents);
  useEffect(() => {
    feathersApp
      .service("events")
      .find()
      .then((res) => {
        dispatch(
          setEvents(
            res.map((event) => {
              return {
                title: event.title,
                start: event.startTime,
                end: event.endTime,
                description: event.description,
              };
            })
          )
        );
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <Calendar
      localizer={localizer}
      onSelectEvent={(event) => {
        dispatch(addOrDisplayEvent(event));
        dispatch(toggleModal());
      }}
      onSelectSlot={(e) => {
        dispatch(setDate(e.slots[0].toString()));

        dispatch(toggleModal());
      }}
      events={eventsState.value}
      startAccessor="start"
      endAccessor="end"
      selectable={true}
      style={{ height: 600, width: 800 }}
    />
  );
};

export default CalendarTasks;
