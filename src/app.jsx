import * as React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
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
    </MantineProvider>
  </React.Fragment>
);
