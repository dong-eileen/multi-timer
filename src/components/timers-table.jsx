import * as React from "react";
import { useState } from "react";
import { Button, Box, Grid, Group } from "@mantine/core";
import TimerPanel from "./timer-panel.jsx";
import { IconPlus } from "@tabler/icons-react";

const TimersTable = () => {
  const [timers, setTimers] = useState({});

  function buildTimerPanel() {
    return <TimerPanel />;
  }

  return (
    <Group>
      <Box>{buildTimerPanel()}</Box>

      <Button leftSection={<IconPlus />} variant="default">
        Add a Timer
      </Button>
    </Group>
  );
};

export default TimersTable;
