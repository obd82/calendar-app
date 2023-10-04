export const DayConvertor = (day) => {
  const dayConvert = day.split("T")[0];
  return dayConvert;
};

export const TimeConvertor = (time) => {
  const timeConvert = time.split("T")[1].slice(0, 5);
  return timeConvert;
};

export const EndDayConvertor = (end) => {
  const newEndValue = (new Date(end).getDate() - 1).toString();

  const endDayConvert = end
    ? end.slice(0, 7) +
    "-" +
    (Number(newEndValue) < 10 ? `0${newEndValue}` : newEndValue) +
    "T24:00"
    : null;
  return endDayConvert;
};

