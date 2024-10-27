import * as React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { TimeInput } from "@mantine/dates";
import { ActionIcon, Fieldset, Group, TextInput } from "@mantine/core";
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconRotateClockwise,
  IconTrash,
} from "@tabler/icons-react";
import buttonClasses from "../css/button.module.css";
import alarmFile from "../audio/default-alarm.wav";

TimerPanel.propTypes = {
  id: PropTypes.number,
  onDeleteTimer: PropTypes.func,
  timerName: PropTypes.string,
  submittedTime: PropTypes.string,
  onTimerSubmit: PropTypes.func,
  onTimerNameChange: PropTypes.func,
};

export default function TimerPanel(props) {
  const translateTimeToSeconds = (input) => {
    const [hoursString, minutesString, secondsString] = input.split(":");
    const hours = +hoursString;
    const minutes = +minutesString;
    const seconds = +secondsString;
    return hours * 60 * 60 + minutes * 60 + seconds;
  };

  const translateSecondsToTime = (input) => {
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

  const ALARM_SOUND = new Audio(alarmFile);

  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState(props.submittedTime);
  const [timeInSeconds, setTimeInSeconds] = useState(
    translateTimeToSeconds(props.submittedTime)
  );
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    setTime(props.submittedTime);
  }, [props.submittedTime]);

  useEffect(() => {
    let interval;
    if (isStarted) {
      interval = setInterval(() => {
        setTimeInSeconds((prevTime) => {
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
    ALARM_SOUND.play();
    window.electronAPI.showNotification(
      `${props.timerName} completed!`,
      `The timer ${props.timerName} has finished.`
    );
  };

  const handleTimerNameChange = (event) => {
    props.onTimerNameChange(props.id, event.currentTarget.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.currentTarget.value);
  };

  const checkTime = () => {
    if (time && translateTimeToSeconds(time) > 0) {
      setTimeError("");
      return true;
    } else {
      setTimeError("Please enter a valid time.");
      return false;
    }
  };

  const submitTime = () => {
    if (!checkTime()) {
      return;
    } else {
      props.onTimerSubmit(props.id, time);
    }
  };

  const toggleTimer = () => {
    if (isStarted) {
      setIsStarted(false);
    } else if (!checkTime()) {
      return;
    } else {
      submitTime();
      setTimeInSeconds(translateTimeToSeconds(time));
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
          value={isStarted ? translateSecondsToTime(timeInSeconds) : time}
          withSeconds
          disabled={isStarted}
          onBlur={submitTime}
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
