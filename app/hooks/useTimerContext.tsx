// useProjectContext.tsx
"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { TaskList } from "../components/TimerToast";

// Définissez le type pour les données de contexte
type StopwatchData = {
  timers: any[];
  setTimers: Dispatch<SetStateAction<any[]>>;
};

// Créez le context
const TimerContext = createContext<StopwatchData | null>(null);

// Créez un fournisseur de contexte
export function TimerContextProvider({ children }: { children: ReactNode }) {
  const [timers, setTimers] = useState<any[]>([]);
  console.log(timers, "wesh");
  return (
    <TimerContext.Provider
      value={{
        timers,
        setTimers,
      }}
    >
      <TaskList />
      {children}
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
