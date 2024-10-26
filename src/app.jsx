import * as React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import TimerPanel from "./components/timer-panel.jsx";
import TimersTable from "./components/timers-table.jsx";
import TimersGroup from "./components/timers-group.jsx";

const theme = createTheme({});

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(
  <React.Fragment>
    <MantineProvider theme={theme}>
      <TimersGroup />
      {/* <TimersTable /> */}
    </MantineProvider>
  </React.Fragment>
);
