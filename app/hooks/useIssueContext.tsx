"use client";

import React from "react";
import { convertIntoTotalSecond } from "../utils/service/timeFunction";
import { useSession } from "next-auth/react";
import axios, { AxiosResponse } from "axios";

export type IssueContextData = {
  issueTime: string | undefined | number;
  setIssueTime: (issueTime: string | undefined | number) => void;
  handleTimeChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    isLayout: boolean,
    issueId?: number
  ) => Promise<AxiosResponse | null>;
};
const IssueContext = React.createContext<IssueContextData | undefined>(
  undefined
);

export function IssueContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [issueTime, setIssueTime] = React.useState<string | undefined | number>(
    ""
  );
  const savedTimeOnChange = async (
    isLayout: boolean,
    issueTime: string,
    issueId: number
  ): Promise<AxiosResponse | null> => {
    if (!isLayout && issueTime.length === 8) {
      const userId = session?.user?.id;
      if (userId) {
        const totalSeconds = await convertIntoTotalSecond(issueTime);

        if (totalSeconds) {
          let data: { userId: number; timer?: typeof totalSeconds } = {
            userId,
            timer: totalSeconds,
          };
          const res = await axios.patch("/api/issues/" + issueId, data);
          return res;
        }
      }
    }
    return null;
  };
  const handleTimeChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    isLayout: boolean,
    issueId?: number
  ): Promise<AxiosResponse | null> => {
    console.log(event.currentTarget.value.length);
    const time = event.currentTarget.value;
    setIssueTime(time);
    // Step for saved in issue Ceil on change
    if (issueId) {
      return await savedTimeOnChange(isLayout, issueTime as string, issueId);
    } else {
      return null;
    }
  };

  const exposed = {
    issueTime,
    setIssueTime,
    handleTimeChange,
  };

  return (
    <IssueContext.Provider value={exposed}> {children}</IssueContext.Provider>
  );
}
export function useIssueContext() {
  const context = React.useContext(IssueContext);
  if (!context) {
    throw new Error(
      "useIssueContext must be used within a IssueContextProvider"
    );
  }
  return context;
}
