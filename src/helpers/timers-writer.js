export const SAVED_DATA_FOLDER = "./saved_data";
export const SAVED_DATA_FILE_NAME = "saved_timers.json";

export const storeTimers = (timers) => {
  window.electronAPI.saveTimersToFile(
    SAVED_DATA_FOLDER,
    SAVED_DATA_FILE_NAME,
    JSON.stringify(timers)
  );
};
