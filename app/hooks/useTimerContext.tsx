"use client";
import { Issue } from "@prisma/client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TaskList } from "../components";
import TimerButton from "../components/Timer/TimerButton";
import { IssueWithTime } from "../issues/list/IssueCells";
import AlertCurrentTimer from "../components/Timer/AlertCurrentTimer";

// Définissez le type pour les données de contexte
type StopwatchData = {
  showToast: boolean;
  setShowToast: (showToast: boolean) => void;
  currentTimer: Issue | null | IssueWithTime;
  setCurrentTimer: (arg: Issue | null | IssueWithTime) => void | IssueWithTime;
  createTimer: (issue: Issue) => void;
  timerRunning: boolean;
  setTimerRunning: (timerRunning: boolean) => void;
  showAlert: boolean;
  setShowAlert: (showAlert: boolean) => void;
};

// Créez le context
const TimerContext = createContext<StopwatchData | null>(null);

// Créez un fournisseur de contexte
export function TimerContextProvider({ children }: { children: ReactNode }) {
  const [showToast, setShowToast] = useState(false);
  const [currentTimer, setCurrentTimer] = useState<
    StopwatchData["currentTimer"] | null
  >(null);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const createTimer = async (issue: Issue) => {
    setCurrentTimer(issue);
    setShowToast(true);
  };
  useEffect(() => {
    if (!timerRunning) setShowAlert(false);
  }, [timerRunning]);
  const value: StopwatchData = {
    showToast,
    setShowToast,
    currentTimer,
    setCurrentTimer,
    createTimer,
    timerRunning,
    setTimerRunning,
    showAlert,
    setShowAlert,
  };
  return (
    <TimerContext.Provider value={value}>
      {children} <TaskList /> <AlertCurrentTimer />
      <TimerButton />
    </TimerContext.Provider>
  );
}

// Créez un hook personnalisé pour utiliser le contexte
export function useTimerContext() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error(
      "useProjectContext must be used within a ProjectContextProvider"
    );
  }
  return context;
}
