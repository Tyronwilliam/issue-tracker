import { IssueWithTime } from "@/app/issues/list/IssueCells";
import {
  applyFormatting,
  convertTotalSecondToUnit,
} from "@/app/utils/service/timeFunction";
import { Issue } from "@prisma/client";
import { TimerIcon } from "@radix-ui/react-icons";
import { Blockquote, Box, Flex, Text } from "@radix-ui/themes";

type PropsTimerContent = {
  timer: IssueWithTime | null;
  hours?: number | undefined;
  minutes?: number | undefined;
  seconds?: number | undefined;
  isToast: boolean;
  totalSeconds?: number;
  toggle?: (arg: number) => void;
  setCurrentTimer?: (arg: Issue | null | IssueWithTime) => void | IssueWithTime;
};
export const TimerContent = ({
  timer,
  hours,
  minutes,
  seconds,
  isToast,
  totalSeconds,
  toggle,
  setCurrentTimer,
}: PropsTimerContent) => {
  // Now you can use stopwatchOffset as needed
  let secondsCustom;
  let minutesCustom;
  let hoursCustom;
  // Now you can use stopwatchOffset as needed

  if (totalSeconds !== undefined) {
    const { seconds, minutes, hours } = convertTotalSecondToUnit(totalSeconds);

    secondsCustom = seconds;
    minutesCustom = minutes;
    hoursCustom = hours;
  }

  const { formattedSeconds, formattedMinutes, formattedHours } =
    applyFormatting(seconds!, minutes!, hours!);

  return (
    <>
      {isToast && (
        <Box className=" overflow-hidden  whitespace-nowrap ">
          <Text
            as="p"
            className=" inline-block w-[100%] z-[100] animate-scrolling-text slide-left"
          >
            {timer?.title}
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
          onClick={() => {
            if (!isToast && toggle && setCurrentTimer && timer) {
              toggle(timer?.id);
              setCurrentTimer(timer);
            } else {
              null;
            }
          }}
        >
          <Text as="p" weight={"regular"} size={`${isToast ? "5" : "2"}`}>
            {hours !== undefined &&
            minutes !== undefined &&
            seconds !== undefined
              ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
              : `${hoursCustom}:${minutesCustom}:${secondsCustom}`}{" "}
          </Text>
        </Box>
      </Flex>
    </>
  );
};
{
  /* } */
}
