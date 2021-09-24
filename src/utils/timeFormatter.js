const timeFormatter = (timer, formatAsNumber = false) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
  if (!formatAsNumber) return `${getHours}:${getMinutes}:${getSeconds}`;
  var minutesInDecimal = getMinutes / 60;
  var hoursDotMinutes = Number(getHours) + minutesInDecimal;
  return hoursDotMinutes;
};

export default timeFormatter;
