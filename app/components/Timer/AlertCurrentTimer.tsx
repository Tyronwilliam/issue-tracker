"use client";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import classNames from "classnames";

const AlertCurrentTimer = () => {
  const { showAlert } = useTimerContext();

  return (
    <div
      className={classNames({
        "hidden absolute top-[2%] left-[99%] gap-5 p-5 w-64 z-0": !showAlert,
        "block absolute w-64 h-fit z-50 top-[2%] left-[99%] gap-5 p-5":
          showAlert,
      })}
      style={{ transform: `translateX(-100%)` }}
    >
      <div
        className={classNames({
          "z-50  max-w-xs rounded-sm px-2 text-center text-sm hidden":
            !showAlert,
          "z-50  max-w-xs slide-top  rounded-sm px-2 text-center text-sm ":
            showAlert,
        })}
        style={{ backgroundColor: " var(--purple-7)" }}
      >
        <p>Veuillez sauvegarder le timer en cours</p>
      </div>
    </div>
  );
};

export default AlertCurrentTimer;
