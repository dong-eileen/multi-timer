// old code to try and figure out how to play a user-defined file...let's just say it didn't go so well because of webpack
// I also figured out that there's an https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement so this isn't used anywhere
import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import alarmFile from "../audio/default-alarm.wav";

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool,
};

export default function AudioPlayer(props) {
  // const [soundFile, setSoundFile] = useState(undefined);

  // useEffect(() => {
  //   const getAudioFile = async () => {
  //     const file = await import(props.soundFilePath);
  //     setSoundFile(file);
  //   };

  //   if (props.soundFilePath) {
  //     getAudioFile();
  //   }
  // }, [props.soundFilePath]);

  const soundFile = new Audio(alarmFile);
  return <audio autoPlay={props.isPlaying} src={alarmFile} />;
}
