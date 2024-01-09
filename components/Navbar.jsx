import Image from "next/image";
import React from "react";
import NavbarComponent from "./NavbarComponent";

const Navbar = () => {
  return (
    <div className="w-[224px] bg-[#1E2640] flex flex-col gap-4 py-4 px-[10px] h-full">
      <div className=" w-full flex-1">
        <div className="flex gap-3 items-center text-white w-full">
          <div className="h-[40px] w-[40px] flex items-center justify-center bg-white rounded-sm">
            <Image src={"/Navbar/Image.png"} height={39} width={39} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[15px] font-medium leading-[22px]">
              Nishyan
            </span>
            <span className="opacity-80 underline text-[13px]">
              Visit store
            </span>
          </div>
          <Image src={"/Navbar/arrow-down.svg"} height={20} width={20} />
        </div>
        <div className="flex flex-col gap-1">
          <NavbarComponent name="Home" icon="wallet" status={false} />
          <NavbarComponent name="Orders" icon="orders" status={false} />
          <NavbarComponent name="Products" icon="products" status={false} />
          <NavbarComponent name="Delivery" icon="delivery" status={false} />
          <NavbarComponent name="Marketing" icon="marketing" status={false} />
          <NavbarComponent name="Analytics" icon="analytics" status={false} />
          <NavbarComponent name="Payments" icon="payments" status={true} />
          <NavbarComponent name="Tools" icon="tools" status={false} />
          <NavbarComponent name="Discounts" icon="discounts" status={false} />
          <NavbarComponent name="Audience" icon="audience" status={false} />
          <NavbarComponent name="Appearance" icon="apperance" status={false} />
          <NavbarComponent name="Plugins" icon="plugins" status={false} />
        </div>
      </div>
      <div className="rounded-sm px-[12px] py-[6px] bg-[#353C53] w-[192px] flex items-center gap-[12px] h-[54px] ">
        <div className="rounded-sm bg-black bg-opacity-10 p-[6px] flex justify-center items-center h-[36px] w-[36px]">
          <Image height={24} width={24} src={"/Navbar/wallet.svg"} />
        </div>
        <div className="flex flex-col text-white">
          <span className="opacity-80  text-[13px] ">Available credits</span>
          <span className="font-medium leading-[24px] ">222.10</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
