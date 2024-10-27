export const SAVED_DATA_FOLDER = "./saved_data";
export const SAVED_DATA_FILE_NAME = "saved_timers.json";

export const storeTimersToFile = async (timers) => {
  return await window.electronAPI.saveTimersToFile(
    SAVED_DATA_FOLDER,
    SAVED_DATA_FILE_NAME,
    JSON.stringify(timers)
  );
};

export const loadTimersFromFile = async () => {
  const data = await window.electronAPI.loadTimersFromFile(
    SAVED_DATA_FOLDER,
    SAVED_DATA_FILE_NAME
  );

  try {
    return JSON.parse(data);
  } catch (e) {
    console.error(e);
    return null;
  }
};
