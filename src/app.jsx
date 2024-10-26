import * as React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import TimerPanel from "./components/timer-panel.jsx";

const theme = createTheme({});

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(
  <React.Fragment>
    <MantineProvider theme={theme}>
      <TimerPanel />
    </MantineProvider>
  </React.Fragment>
);
