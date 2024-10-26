import * as React from "react";
import { useState, useReducer } from "react";
import { Button, Grid, Space, TextInput, Fieldset } from "@mantine/core";
import TimerPanel from "./timer-panel.jsx";
import { IconPlus } from "@tabler/icons-react";

// TODO: need to make new groups
// TODO: need to find a way to save the timers
export default function TimersGroup() {
  const createDefaultTimerConfig = (id) => {
    return {
      id,
      timerName: "Timer Name",
      submittedTime: 0,
    };
  };

  const [groupName, setGroupName] = useState("");
  const [timers, setTimers] = useState([createDefaultTimerConfig(0)]);

  const handleGroupNameChange = (event) => {
    setGroupName(event.currentTarget.value);
  };

  const saveSubmittedTime = (changedTimerId, submittedTime) => {
    setTimers(
      timers.map((timer) => {
        if (timer.id === changedTimerId) {
          return {
            ...timer,
            submittedTime,
          };
        } else {
          return timer;
        }
      })
    );
  };

  const saveTimerName = (changedTimerId, timerName) => {
    setTimers(
      timers.map((timer) => {
        if (timer.id === changedTimerId) {
          return {
            ...timer,
            timerName,
          };
        } else {
          return timer;
        }
      })
    );
  };

  const renderTimerPanel = ({ timerName, submittedTime, id }) => {
    return (
      <Grid.Col key={id} span="content">
        <TimerPanel
          onDeleteTimer={deleteATimer}
          id={id}
          timerName={timerName}
          submittedTime={submittedTime}
          onTimerStart={saveSubmittedTime}
          onTimerNameChange={saveTimerName}
        />
      </Grid.Col>
    );
  };

  const addATimer = () => {
    const newId = makeNewId();
    setTimers([...timers, createDefaultTimerConfig(newId)]);
  };

  const makeNewId = () => {
    if (!timers.length) {
      return 0;
    }
    const currentMax = Math.max(...timers.map(({ id }) => id));
    return currentMax + 1;
  };

  const deleteATimer = (idToDelete) => {
    setTimers(timers.filter(({ id }) => id !== idToDelete));
  };

  return (
    <Fieldset>
      <TextInput
        label="Group Name"
        value={groupName}
        onChange={handleGroupNameChange}
      />
      <Space h="md" />
      <Grid>
        {timers.map(renderTimerPanel)}
        <Space w="md" />
        <Button
          leftSection={<IconPlus />}
          variant="default"
          onClick={addATimer}
        >
          Add a Timer
        </Button>
      </Grid>
    </Fieldset>
  );
}
