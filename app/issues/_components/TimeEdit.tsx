import { Flex } from "@radix-ui/themes";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

const TimeEdit = ({
  issueTime,
  handleTimeChange,
  isLayout,
  toggle,
  issueId,
  setIssueTime,
}: {
  issueTime: string | undefined | number;
  handleTimeChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    isLayout: boolean,
    issueId?: number
  ) => Promise<AxiosResponse | null>;
  issueId?: number;
  isLayout: boolean;
  toggle?: (arg: number | null) => void;
  setIssueTime?: (issueTime: string | undefined | number) => void;
}) => {
  const router = useRouter();
  return (
    <Flex gap={"3"} align={"center"}>
      <input
        className="input__time"
        type="time"
        step="1"
        value={issueTime}
        name="time"
        onChange={(e) => {
          const time = e.currentTarget.value;
          if (setIssueTime) setIssueTime(time);
        }}
        onBlur={async (e) => {
          if (isLayout) {
            handleTimeChange(e, isLayout);
          } else {
            const res = await handleTimeChange(e, isLayout, issueId);
            if (res?.status === 200) {
              if (setIssueTime && toggle) {
                setIssueTime("");
                toggle(null);
                router.refresh();
              }
            }
          }
        }}
      />
      {isLayout ? (
        <label
          htmlFor="time"
          className="p-1 bg-[var(--purple-a5)] text-sm rounded-sm"
        >
          Minuteur
        </label>
      ) : null}
    </Flex>
  );
};
export default TimeEdit;
