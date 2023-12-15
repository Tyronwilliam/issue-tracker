import React from "react";

const ProgressBar = ({
  progress,
  bgColor,
}: {
  progress: number;
  bgColor: string;
}) => {
  return (
    <div className=" md:flex items-center h-full w-full gap-5">
      <div
        className="relative overflow-hidden  rounded-full w-[100px] h-[10px] z-10 flex items-center "
        style={{
          background: "var(--gray-a4)",
        }}
      >
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className={` h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)] z-50 absolute`}
          style={{
            width: `${progress}%`,
            background: `${bgColor}`,
          }}
        ></div>
      </div>
      <span>{progress}%</span>
    </div>
  );
};

export default ProgressBar;
