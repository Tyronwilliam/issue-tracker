const formatTimeUnit = (unit: number): string =>
  unit < 10 ? `0${unit}` : `${unit}`;

export const convertTotalSecondToUnit = (totalSeconds: number) => {
  let seconds;
  let minutes;
  let hours;

  seconds = totalSeconds % 60;
  minutes = Math.floor((totalSeconds / 60) % 60);
  hours = Math.floor(totalSeconds / 3600);
  const { formattedSeconds, formattedMinutes, formattedHours } =
    applyFormatting(seconds, minutes, hours);

  return {
    seconds: formattedSeconds,
    minutes: formattedMinutes,
    hours: formattedHours,
  };
};

export const applyFormatting = (
  seconds: number,
  minutes: number,
  hours: number
): {
  formattedSeconds: string;
  formattedMinutes: string;
  formattedHours: string;
} => {
  const formattedSeconds = formatTimeUnit(seconds);
  const formattedMinutes = formatTimeUnit(minutes);
  const formattedHours = formatTimeUnit(hours);

  return { formattedSeconds, formattedMinutes, formattedHours };
};
