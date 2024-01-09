import React from "react";

const MainStat = ({ name, stat }) => {
  return (
    <div className="p-[20px] gap-4 flex flex-col w-full">
      <span className="text-[#4D4D4D] leading-[24px]">{name}</span>
      <span className="text-[#1A181E] text-[32px] font-medium leading-[38px]">
        {stat}
      </span>
    </div>
  );
};

export default MainStat;
