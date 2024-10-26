import * as React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { TimeInput } from "@mantine/dates";
import { ActionIcon, Fieldset, Group, TextInput } from "@mantine/core";
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconRotateClockwise,
  IconTrash,
} from "@tabler/icons-react";
import buttonClasses from "../css/button.module.css";

TimerPanel.propTypes = {
  id: PropTypes.number,
  onDeleteTimer: PropTypes.func,
};

export default function TimerPanel(props) {
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState("");
  const [submittedTime, setSubmittedTime] = useState("");
  const [timerName, setTimerName] = useState("Timer Name");
  const [timeError, setTimeError] = useState("");

  const translateTimeToSeconds = (input) => {
    const [hoursString, minutesString] = input.split(":");
    const hours = +hoursString;
    const minutes = +minutesString;
    return hours * 60 * 60 + minutes * 60;
  };

  const handleTimerNameChange = (event) => {
    setTimerName(event.currentTarget.value);
  };

  const handleTimeChange = (event) => {
    const timeInSeconds = translateTimeToSeconds(event.currentTarget.value);
    setTime(event.currentTarget.value);
  };

  const checkTime = () => {
    // check if the user has input a full time, including the seconds
    if (time.split(":").length === 3) {
      setTimeError("");
      return true;
    } else {
      setTimeError("Please enter a valid time.");
      return false;
    }
  };

  const toggleTimer = () => {
    if (!checkTime()) {
      return;
    }
    setSubmittedTime(time);
    if (isStarted) {
      setIsStarted(false);
    } else {
      setIsStarted(true);
    }
  };

  const handleTimerRestart = () => {
    setIsStarted(false);
    setTime(submittedTime);
  };

  const deleteTimer = () => {
    props.onDeleteTimer(props.id);
  };

  return (
    <React.Fragment>
      <Fieldset variant="filled">
        <TextInput onChange={handleTimerNameChange} value={timerName} />
        <p />
        <TimeInput
          error={timeError}
          onChange={handleTimeChange}
          value={time}
          withSeconds
          minTime="00:00:00"
          disabled={isStarted}
        />
        <p />
        <Group>
          <ActionIcon
            variant="filled"
            aria-label="Start Timer"
            onClick={toggleTimer}
          >
            {isStarted ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
          </ActionIcon>
          {isStarted && (
            <ActionIcon
              variant="filled"
              aria-label="Restart Timer"
              onClick={handleTimerRestart}
            >
              <IconRotateClockwise />
            </ActionIcon>
          )}
          <ActionIcon
            variant="filled"
            color="red"
            aria-label="Delete Timer"
            onClick={deleteTimer}
            className={buttonClasses.pullright}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      </Fieldset>
    </React.Fragment>
  );
}
