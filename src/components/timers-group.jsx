import * as React from "react";
import { useState, useReducer } from "react";
import { Button, Grid, Space, TextInput, Fieldset } from "@mantine/core";
import TimerPanel from "./timer-panel.jsx";
import { IconPlus } from "@tabler/icons-react";
import timersReducer from "../reducers/timers-reducer.js";
import { initialTimers } from "../reducers/timers-reducer.js";

// TODO: need to make new groups
// TODO: need to find a way to save the timers
export default function TimersGroup() {
  const [groupName, setGroupName] = useState("");
  const [timers, dispatch] = useReducer(timersReducer, initialTimers);

  const handleGroupNameChange = (event) => {
    setGroupName(event.currentTarget.value);
  };

  const saveSubmittedTime = (changedTimerId, submittedTime) => {
    dispatch({
      type: "submitted",
      changedTimerId,
      submittedTime,
    });
  };

  const saveTimerName = (changedTimerId, timerName) => {
    dispatch({
      type: "renamed",
      changedTimerId,
      timerName,
    });
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
    dispatch({
      type: "added",
    });
  };

  const deleteATimer = (idToDelete) => {
    dispatch({
      type: "deleted",
      idToDelete,
    });
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
