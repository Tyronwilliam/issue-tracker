"use client";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import { LapTimerIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import React from "react";

const TimerButton = () => {
  const { timers, showToast, setShowToast, currentTimer } = useTimerContext();
  if (timers?.length === 0 || !currentTimer) return;

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
