import * as React from "react";
import PropTypes from "prop-types";
import { Space, Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

SuccessNotification.propTypes = {
  successful: PropTypes.bool,
  showNotification: PropTypes.bool,
};
export default function SuccessNotification(props) {
  return (
    props.showNotification && (
      <React.Fragment>
        <Notification icon={props.successful ? <IconCheck /> : <IconX />}>
          {props.successful ? "Saved Successfully" : "Something went wrong"}
        </Notification>
        <Space h="md" />
      </React.Fragment>
    )
  );
}
