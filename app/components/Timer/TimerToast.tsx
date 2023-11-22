"use client";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import { PlayIcon, StopIcon, TimerIcon } from "@radix-ui/react-icons";
import { Blockquote, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

// Pouvoir cliquer sur l'icone pou r creer un timer OK
// Lorsque le timer est lancé je ne peux pas lancer le meme  OK
// Le timer se declenche automatiquement
// Si on declenche un timer alors qu'il y en as un qui tourne / Modal avertissement etes vous sur de vouloir arreter le timer actuelle = Current
//
// On ne peux pas lancer deux timer a la fois OU
// Si deja un timer alors on stop le timer actuel
// On sauvegarde la valeur du timer
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
  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + timer.timer);
  const {
    seconds,
    minutes,
    hours,
    pause,
    start,
    isRunning,
    totalSeconds,
    reset,
  } = useStopwatch({ offsetTimestamp: stopwatchOffset, autoStart: true });
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
    console.log(updateTimer, "wesh");
  };
  useEffect(() => {
    if (currentTimer !== timer?.id) {
      pause();
    }
  }, [timer, currentTimer]);

  useEffect(() => {
    // Recherchez le bon timer dans le tableau en fonction de son ID
    const updatedTimers = timers.map((t) => {
      if (t.id === timer.id) {
        // Mettez à jour les valeurs du timer avec les nouvelles valeurs
        return {
          ...t,
          seconds: seconds,
          minutes: minutes,
          hours: hours,
        };
      } else {
        return t;
      }
    });

    // Mettez à jour le tableau des timers avec les timers mis à jour
    setTimers(updatedTimers);
  }, [totalSeconds, seconds, minutes, hours, timer, timers]);

  return (
    <Card
      className={`z-50 slide-top max-w-xs bg-white ${
        showToast ? " slide-top" : "slide-down"
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
};
export const TimerContent = ({
  timer,
  hours,
  minutes,
  seconds,
  isToast,
}: PropsTimerContent) => {
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
          style={{ transform: "translate(-20%)" }}
        >
          <Text as="p" weight={"regular"} size={"5"}>
            {hours}:{minutes}:{seconds}
          </Text>
        </Box>
      </Flex>
    </>
  );
};
