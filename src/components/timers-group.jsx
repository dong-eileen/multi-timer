import * as React from "react";
import { useState } from "react";
import {
  Button,
  Box,
  Container,
  Grid,
  Group,
  Flex,
  Space,
  TextInput,
  Fieldset,
} from "@mantine/core";
import TimerPanel from "./timer-panel.jsx";
import { IconPlus } from "@tabler/icons-react";

export default function TimersGroup() {
  function createDefaultTimerConfig(id) {
    return {
      id,
      timerName: "Timer Name",
      time: "",
    };
  }

  const [groupName, setGroupName] = useState("");
  const [timers, setTimers] = useState([createDefaultTimerConfig(0)]);

  function handleGroupNameChange(event) {
    setGroupName(event.currentTarget.value);
  }

  function renderTimerPanel({ timerName, time, id }) {
    return (
      <Grid.Col key={id} span="content">
        <TimerPanel onDeleteTimer={deleteATimer} id={id} />
      </Grid.Col>
    );
  }

  function addATimer() {
    const newId = makeNewId();
    setTimers([...timers, createDefaultTimerConfig(newId)]);
  }

  function makeNewId() {
    if (!timers.length) {
      return 0;
    }
    const currentMax = Math.max(...timers.map(({ id }) => id));
    return currentMax + 1;
  }

  function deleteATimer(idToDelete) {
    setTimers(timers.filter(({ id }) => id !== idToDelete));
  }

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