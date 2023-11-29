"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import TimerButton from "../components/Timer/TimerButton";
import { Issue } from "@prisma/client";

// Définissez le type pour les données de contexte
type StopwatchData = {
  timers: Issue[];
  setTimers: Dispatch<SetStateAction<any[]>>;
  showToast: boolean;
  setShowToast: (showToast: boolean) => void;
  currentTimer: number | null;
  setCurrentTimer: (arg: number) => void;
};

// Créez le context
const TimerContext = createContext<StopwatchData | null>(null);

// Créez un fournisseur de contexte
export function TimerContextProvider({ children }: { children: ReactNode }) {
  const [timers, setTimers] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [currentTimer, setCurrentTimer] = useState<number | null>(null);
  const value: StopwatchData = {
    timers,
    setTimers,
    showToast,
    setShowToast,
    currentTimer,
    setCurrentTimer,
  };
  return (
    <TimerContext.Provider value={value}>
      {children}
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
