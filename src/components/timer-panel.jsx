import * as React from "react";
import { useState } from "react";
import { TimeInput } from "@mantine/dates";
import { ActionIcon, Fieldset, Group, TextInput } from "@mantine/core";
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconRotateClockwise,
} from "@tabler/icons-react";

export default function TimerPanel() {
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState("");
  const [submittedTime, setSubmittedTime] = useState("");
  const [timerName, setTimerName] = useState("Timer Name");
  const [timeError, setTimeError] = useState("");

  function translateTimeToSeconds(input) {
    const [hoursString, minutesString] = input.split(":");
    const hours = +hoursString;
    const minutes = +minutesString;
    return hours * 60 * 60 + minutes * 60;
  }

  function handleTimerNameChange(event) {
    setTimerName(event.currentTarget.value);
  }

  function handleTimeChange(event) {
    const timeInSeconds = translateTimeToSeconds(event.currentTarget.value);
    setTime(event.currentTarget.value);
  }

  function checkTime() {
    // check if the user has input a full time, including the seconds
    if (time.split(":").length === 3) {
      setTimeError("");
      return true;
    } else {
      setTimeError("Please enter a valid time.");
      return false;
    }
  }

  function toggleTimer() {
    if (!checkTime()) {
      return;
    }
    setSubmittedTime(time);
    if (isStarted) {
      setIsStarted(false);
    } else {
      setIsStarted(true);
    }
  }

  function handleTimerRestart() {
    setIsStarted(false);
    setTime(submittedTime);
  }

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
        </Group>
      </Fieldset>
    </React.Fragment>
  );
}
