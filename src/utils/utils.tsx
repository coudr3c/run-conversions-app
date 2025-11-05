import type { Pace, Time } from "../types/types";

export const roundToTwoDecimals = (a: number) => {
  return Math.floor(a * 100) / 100;
};

export const roundToThreeDecimals = (a: number) => {
  return Math.floor(a * 1000) / 1000;
};

export const speedToPace = (speed: number) => {
  if (speed === 0) return { minutes: 0, seconds: 0 };
  return {
    minutes: Math.floor(60 / speed),
    seconds: Math.floor((60 / speed - Math.floor(60 / speed)) * 60),
  };
};

export const paceMinSecToBase10 = (pace: Pace) => {
  return pace.minutes + pace.seconds / 60;
};

export const paceBase10ToMinSec = (pace: number) => {
  return { minutes: Math.floor(pace), seconds: (pace - Math.floor(pace)) * 60 };
};

export const timeMinSecToBase10 = (time: Time) => {
  return time.hours * 60 + time.minutes + time.seconds / 60;
};

export const timeBase10ToMinSec = (time: number) => {
  return {
    hours: Math.floor(time / 60),
    minutes: Math.floor(time % 60),
    seconds: Math.floor((time - Math.floor(time)) * 60),
  };
};

export const paceAndDistanceToTime = (pace: Pace, distance: number) => {
  const timeBase10 = paceMinSecToBase10(pace) * distance;
  return timeBase10ToMinSec(timeBase10);
};

export const formatPace = (pace: Pace) => {
  return pace.minutes + ":" + String(pace.seconds).padStart(2, "0");
};

export const formatTime = (time: Time) => {
  return (
    time.hours +
    ":" +
    String(time.minutes).padStart(2, "0") +
    ":" +
    String(time.seconds).padStart(2, "0")
  );
};
