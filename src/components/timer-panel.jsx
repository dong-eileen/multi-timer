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
  timerName: PropTypes.string,
  submittedTime: PropTypes.number,
  onTimerStart: PropTypes.func,
  onTimerNameChange: PropTypes.func,
};

export default function TimerPanel(props) {
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState(props.submittedTime);
  const [timeError, setTimeError] = useState("");

  const translateTimeToSeconds = (input) => {
    const [hoursString, minutesString, secondsString] = input.split(":");
    const hours = +hoursString;
    const minutes = +minutesString;
    const seconds = +secondsString;
    return hours * 60 * 60 + minutes * 60 + seconds;
  };

  const renderTimeInReadableFormat = (input) => {
    const hours = Math.floor(input / (60 * 60));
    const minutes = Math.floor((input % (60 * 60)) / 60);
    const seconds = input % 60;
    return (
      `${hours}`.padStart(2, 0) +
      ":" +
      `${minutes}`.padStart(2, 0) +
      ":" +
      `${seconds}`.padStart(2, 0)
    );
  };

  React.useEffect(() => {
    let interval;
    if (isStarted) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval);
            restartTimer();
            showFinishedNotification();
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isStarted]);

  const showFinishedNotification = () => {
    
    window.electronAPI.showNotification(
      `${props.timerName} completed!`,
      `The timer ${props.timerName} has finished.`
    );
  };

  const handleTimerNameChange = (event) => {
    props.onTimerNameChange(props.id, event.currentTarget.value);
  };

  const handleTimeChange = (event) => {
    setTime(translateTimeToSeconds(event.currentTarget.value));
  };

  const checkTime = () => {
    if (time > 0) {
      setTimeError("");
      return true;
    } else {
      setTimeError("Please enter a valid time.");
      return false;
    }
  };

  const toggleTimer = () => {
    if (isStarted) {
      setIsStarted(false);
    } else if (!checkTime()) {
      return;
    } else {
      props.onTimerStart(props.id, time);
      setIsStarted(true);
    }
  };

  const restartTimer = () => {
    setIsStarted(false);
    setTime(props.submittedTime);
  };

  const deleteTimer = () => {
    props.onDeleteTimer(props.id);
  };

  return (
    <React.Fragment>
      <Fieldset variant="filled">
        <TextInput onChange={handleTimerNameChange} value={props.timerName} />
        <p />
        <TimeInput
          error={timeError}
          onChange={handleTimeChange}
          value={renderTimeInReadableFormat(time)}
          withSeconds
          disabled={isStarted}
          onBlur={checkTime}
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
              onClick={restartTimer}
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
