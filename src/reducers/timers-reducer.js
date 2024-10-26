export default function timersReducer(timers, action) {
  switch (action.type) {
    case "add":
      return handleAddTimer(timers);
    case "submitted":
      return handleTimerSubmitted(timers, action);
  }
}

const handleAddTimer = (timers) => {
  const newId = makeNewId();
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
