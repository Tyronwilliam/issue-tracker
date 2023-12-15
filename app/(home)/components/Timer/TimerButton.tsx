"use client";
import { LapTimerIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import React from "react";
import { useTimerContext } from "../../hooks/useTimerContext";

const TimerButton = () => {
  // const { timers, showToast, setShowToast, currentTimer } = useTimerContext();
  const { showToast, setShowToast, currentTimer } = useTimerContext();
  if (!currentTimer) return;

  return (
    <IconButton
      className="fixed bottom-[2%] right-[2%] cursor-pointer"
      radius="full"
      onClick={() => setShowToast(!showToast)}
    >
      <LapTimerIcon width="18" height="18" />
    </IconButton>
  );
};

export default TimerButton;
