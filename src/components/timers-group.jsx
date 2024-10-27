import * as React from "react";
import { useState, useReducer } from "react";
import {
  Button,
  Grid,
  Space,
  TextInput,
  Fieldset,
  Notification,
} from "@mantine/core";
import TimerPanel from "./timer-panel.jsx";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import timersReducer from "../reducers/timers-reducer.js";
import { initialTimers } from "../reducers/timers-reducer.js";
import {
  loadTimersFromFile,
  storeTimersToFile,
} from "../helpers/timers-writer.js";
import buttonClasses from "../css/button.module.css";
import SuccessNotification from "./success-notification.jsx";

// TODO: need to make new groups
// TODO: need to find a way to restore FROM saved data
export default function TimersGroup() {
  const [groupName, setGroupName] = useState("");
  const [timers, dispatch] = useReducer(timersReducer, initialTimers);
  const [successNotification, setSuccessNotification] = useState({
    successful: false,
    showNotification: false,
    successfulText: "",
  });

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

  // TODO: bug/refactoring -- when you edit the time -> don't click start Timer -> click Save timers, SubmittedTime is still 0 and it gets saved as 0
  const saveTimers = async () => {
    const successful = await storeTimersToFile(timers);
    showSuccessNotification(successful, "Saved successfully");
  };

  const loadTimers = async () => {
    const data = await loadTimersFromFile();
    if (data) {
      dispatch({
        type: "loaded",
        newTimers: data,
      });
    }
    showSuccessNotification(!!data, "Loaded successfully");
  };

  const showSuccessNotification = (successful, successfulText) => {
    setSuccessNotification({
      successful,
      showNotification: true,
      successfulText,
    });
    setTimeout(() => {
      setSuccessNotification({
        ...successNotification,
        showNotification: false,
      });
    }, 2000);
  };

  return (
    <React.Fragment>
      <SuccessNotification
        successful={successNotification.successful}
        showNotification={successNotification.showNotification}
        successfulText={successNotification.successfulText}
      />
      <Button onClick={saveTimers}>Save Timers</Button>
      <Button onClick={loadTimers}>Load Timers</Button>

      <Space h="md" />

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
    </React.Fragment>
  );
}
