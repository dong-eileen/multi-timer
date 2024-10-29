self.onmessage = (event) => {
  let { timeInSeconds } = event.data;
  let interval;
  interval = setInterval(() => {
    if (timeInSeconds === 0) {
      clearInterval(interval);
    } else {
      timeInSeconds -= 1;
    }
    self.postMessage({ remainingTime: timeInSeconds });
  }, 1000);
};
