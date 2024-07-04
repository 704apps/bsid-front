import React from "react";

const ProgressBar = ({ step, steps }: { step: number, steps: string[] }) => {
  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="relative w-full sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 mt-4 sm:mt-8 md:mt-12 mx-auto mb-4 sm:mb-8 md:mb-12">
      <div
        className="absolute top-1/2 left-0 transform -translate-y-1/2 h-1 bg-gray-200"
        style={{ width: "100%" }}
      >
        <div
          className="absolute top-0 h-full bg-green-500"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="absolute top-0 flex justify-between w-full">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${index <= step - 1 ? "bg-green-500" : "bg-white border border-gray-300"}`}
              style={{
                position: 'absolute',
                top: '-8px',
                left: `${(index / (steps.length - 1)) * 100}%`,
                transform: 'translateX(-50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <span
                className="text-[8px] sm:text-[10px] md:text-[12px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px]"
                style={{
                  position: 'absolute',
                  top: '-24px',
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                }}
              >
                {steps[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
