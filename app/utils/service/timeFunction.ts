import { Issue } from "@prisma/client";
import axios, { AxiosResponse } from "axios";

export interface Time {
  hours?: number;
  minutes?: number;
  seconds?: number;
}
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
export function convertIntoTotalSecond(duree: string) {
  // Séparer les heures, minutes et secondes
  const [heures, minutes, secondes] = duree.split(":").map(Number);

  // Calculer le total de secondes
  const totalSecondes = heures * 3600 + minutes * 60 + secondes;

  return totalSecondes;
}
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
export const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const updateTimeOnPause = async (
  totalSeconds: number,
  timer: Issue
): Promise<AxiosResponse<Response>> => {
  return await axios
    .patch("/api/issues/" + timer.id, {
      timer: totalSeconds,
    })
    .then((res) => res)
    .catch((err) => err);
};
