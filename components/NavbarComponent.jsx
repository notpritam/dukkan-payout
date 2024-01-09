import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const NavbarComponent = ({ name, icon, status }) => {
  return (
    <div
      className={cn(
        "rounded-sm px-4 py-[8px] flex gap-4 text-white ",
        status ? "bg-white bg-opacity-10" : null
      )}
    >
      <Image height={20} width={20} src={`/Navbar/${icon}.svg`} />
      <span className="font-medium leading-[20px] opacity-80">{name}</span>
    </div>
  );
};

export default NavbarComponent;
