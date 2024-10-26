const handleTimerRenamed = (timers, action) => {
  const { changedTimerId, timerName } = action;
  return timers.map((timer) => {
    if (timer.id === changedTimerId) {
      return {
        ...timer,
        timerName,
      };
    } else {
      return timer;
    }
  });
};

const handleTimerDeleted = (timers, action) => {
  return timers.filter(({ id }) => id !== action.idToDelete);
};

const handleAddedTimer = (timers) => {
  const newId = makeNewId(timers);
  return [...timers, createDefaultTimerConfig(newId)];
};

const createDefaultTimerConfig = (id) => {
  return {
    id,
    timerName: "Timer Name",
    submittedTime: 0,
  };
};

const makeNewId = (timers) => {
  if (!timers.length) {
    return 0;
  }
  const currentMax = Math.max(...timers.map(({ id }) => id));
  return currentMax + 1;
};

const handleTimerSubmitted = (timers, action) => {
  const { changedTimerId, submittedTime } = action;
  return timers.map((timer) => {
    if (timer.id === changedTimerId) {
      return {
        ...timer,
        submittedTime,
      };
    } else {
      return timer;
    }
  });
};

export const initialTimers = [createDefaultTimerConfig(0)];

export default function timersReducer(timers, action) {
  switch (action.type) {
    case "added":
      return handleAddedTimer(timers);
    case "submitted":
      return handleTimerSubmitted(timers, action);
    case "deleted":
      return handleTimerDeleted(timers, action);
    case "renamed":
      return handleTimerRenamed(timers, action);
  }
}
