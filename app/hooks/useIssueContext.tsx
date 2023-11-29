"use client";

import React from "react";

export type IssueContextData = {
  issueTime: string | undefined | number;
  setIssueTime: (issueTime: string | undefined | number) => void;
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const IssueContext = React.createContext<IssueContextData | undefined>(
  undefined
);

export function IssueContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [issueTime, setIssueTime] = React.useState<string | undefined | number>(
    ""
  );
  const handleTimeChange = (event: any) => {
    console.log(typeof event.currentTarget.value);
    const time = event.currentTarget.value;

    setIssueTime(time);
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
