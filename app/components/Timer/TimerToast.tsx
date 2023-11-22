"use client";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import { PlayIcon, StopIcon, TimerIcon } from "@radix-ui/react-icons";
import { Blockquote, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";

// Pouvoir cliquer sur l'icone pou r creer un timer OK
// Si il y a une valeur differente de 0 alors on initialise le timer a la aleur de la bdd
// Lorsque le timer est lancé je ne peux pas lancer le meme  OK
// Le timer se declenche automatiquement OK
// Si on declenche un timer alors qu'il y en as un qui tourne / Modal avertissement etes vous sur de vouloir arreter le timer actuelle = Current
//
// On ne peux pas lancer deux timer a la fois OK
// Si deja un timer alors on stop le timer actuel OK
// On sauvegarde la valeur du timer OK
// Back to step 1
export const CustomTimerToast = ({
  timer,
  showToast,
  setShowToast,
  timers,
  setTimers,
}: {
  timers: any[];
  timer: any;
  showToast: boolean;
  setTimers: (arg: any) => void;
  setShowToast: (showToast: boolean) => void;
}) => {

  // Conversion totalseconds BDD en Date
  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + timer.timer);

  const { seconds, minutes, hours, pause, start, isRunning, totalSeconds } =
    useStopwatch({ offsetTimestamp: stopwatchOffset, autoStart: true });

  const { currentTimer, setCurrentTimer } = useTimerContext();

  const handleStart = async () => {
    setCurrentTimer(timer?.id);
    start();
  };

  const handlePause = async () => {
    pause();
    const updateTimer = await axios.patch("/api/issues/" + timer.id, {
      timer: totalSeconds,
    });
    setShowToast(false);
  };
  useEffect(() => {
    if (currentTimer !== timer?.id) {
      pause();
    }
  }, [timer?.id, currentTimer]);

  useEffect(() => {
    // Recherchez le bon timer dans le tableau en fonction de son ID
    const updatedTimers = timers.map((t) => {
      if (t.id === timer.id) {
        // Mettez à jour les valeurs du timer avec les nouvelles valeurs
        return {
          ...t,
          seconds: seconds !== undefined ? seconds : t.seconds,
          minutes: minutes !== undefined ? minutes : t.minutes,
          hours: hours !== undefined ? hours : t.hours,
        };
      } else {
        return t;
      }
    });
    // Mettez à jour le tableau des timers avec les timers mis à jour
    setTimers(updatedTimers);
  }, [totalSeconds, seconds, minutes, hours, timer?.id]);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isRunning) {
        // If the timer is running, show a confirmation message
        const message =
          "Un timer est en cours, êtes-vous sûr de vouloir quitter la page ?";
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isRunning]);
  return (
    <Card
      className={`z-50  max-w-xs bg-white ${
        !showToast ? "slide-down" : "slide-top"
      }`}
      variant="classic"
      style={{ backgroundColor: "white" }}
    >
      <Flex direction={"column"} gap={"2"}>
        <TimerContent
          timer={timer}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          isToast={true}
        />
        <TimerAction
          isRunning={isRunning}
          handlePause={handlePause}
          handleStart={handleStart}
        />
      </Flex>
    </Card>
  );
};

type PropsTimerAction = {
  isRunning: boolean;
  handlePause: () => void;
  handleStart: () => void;
};
const TimerAction = ({
  isRunning,
  handlePause,
  handleStart,
}: PropsTimerAction) => {
  return isRunning ? (
    <Button onClick={handlePause}>
      <StopIcon style={{ color: "var(--accent-11)" }} />
      Pause
    </Button>
  ) : (
    <Button
      onClick={handleStart}
      className="flex items-center border-[1px] p-2 rounded-mb"
      style={{ backgroundColor: "var(--accent-9)" }}
    >
      <PlayIcon />
      Démarrer
    </Button>
  );
};

type PropsTimerContent = {
  timer: any;
  hours: number;
  minutes: number;
  seconds: number;
  isToast: boolean;
  totalSeconds?: number;
};
export const TimerContent = ({
  timer,
  hours,
  minutes,
  seconds,
  isToast,
  totalSeconds,
}: PropsTimerContent) => {
  // Now you can use stopwatchOffset as needed
  let secondsCustom;
  let minutesCustom;
  let hoursCustom;
  if (totalSeconds !== undefined) {
    secondsCustom = totalSeconds % 60;
    minutesCustom = Math.floor((totalSeconds / 60) % 60);
    hoursCustom = Math.floor(totalSeconds / 3600);
  }
  return (
    <>
      {isToast && (
        <Box className=" overflow-hidden  whitespace-nowrap ">
          <Text
            as="p"
            className=" inline-block w-[100%] z-[100] animate-scrolling-text slide-left"
          >
            {timer.title}
          </Text>
        </Box>
      )}
      <Flex align={"center"} gap={"2"}>
        {isToast && (
          <Blockquote
            style={{ paddingLeft: "3px" }}
            className="justify-self-start"
          >
            <TimerIcon />
          </Blockquote>
        )}
        <Box
          className="inline-block mx-auto"
          style={isToast ? { transform: "translate(-20%)" } : {}}
        >
          <Text as="p" weight={"regular"} size={`${isToast ? "5" : "2"}`}>
            {hours !== undefined &&
            minutes !== undefined &&
            seconds !== undefined
              ? `${hours}:${minutes}:${seconds}`
              : `${hoursCustom}:${minutesCustom}:${secondsCustom}`}
          </Text>
        </Box>
      </Flex>
    </>
  );
};
