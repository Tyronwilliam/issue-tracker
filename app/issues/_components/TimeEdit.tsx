import { Flex } from "@radix-ui/themes";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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
  const handleResponse = (isSuccess: boolean) => {
    if (isSuccess) {
      toast.success("C'est fait !");
    } else {
      toast.error("Oups, sauvegarde impossible");
    }
    if (setIssueTime && toggle) {
      setIssueTime("");
      toggle(null);
      router.refresh();
    }
  };
  const handleSubmit = async (e: any) => {
    if (isLayout) {
      handleTimeChange(e, isLayout);
    } else {
      const res = await handleTimeChange(e, isLayout, issueId);
      const statusBoolean: boolean = res?.status === 200 ? true : false;
      handleResponse(statusBoolean);
    }
  };

  const handlePressKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isLayout && e.key === "Enter") {
      const res = await handleTimeChange(e as any, isLayout, issueId);
      const statusBoolean: boolean = res?.status === 200 ? true : false;
      handleResponse(statusBoolean);
    }
  };

  return (
    <>
      <Toaster />
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
          onKeyDown={handlePressKey}
          onBlur={handleSubmit}
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
    </>
  );
};
export default TimeEdit;
