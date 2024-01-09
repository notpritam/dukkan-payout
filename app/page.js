"use client";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MainStat from "@/components/MainStat";
import { DataTable, PaginationSection } from "@/components/Table";
import { DataTableDemo } from "@/components/DataTableDemo";
import { useEffect, useState } from "react";

export default function Home() {
  const data = [];
  for (let i = 0; i < 500; i++) {
    data.push({
      orderId: "#" + (23343 + i),
      orderDate: `12 Dec 20${23 + Math.floor(i / 4)}`,
      orderAmount: `₹${23_000 + i * 100}`,
      transcationFee: `₹${22 + i}`,
    });
  }
  const columns = [
    {
      accessorKey: "orderId",
      header: () => (
        <div className="flex-1">
          <span>Order ID</span>
        </div>
      ),
      cell: ({ row }) => {
        const orderId = row.getValue("orderId");
        return <span className="text-[#146EB4]">{orderId}</span>;
      },
    },
    {
      accessorKey: "orderDate",
      header: () => (
        <div className="flex items-center gap-[2px] flex-1">
          <span>Order date</span>
          <Image src={"/Main/table-down.svg"} height={8} width={8} />
        </div>
      ),
    },
    {
      accessorKey: "orderAmount",
      header: () => (
        <div className="flex-1 text-right">
          <span>Order amount</span>
        </div>
      ),
      cell: ({ row }) => {
        const orderAmount = row.getValue("orderAmount");
        return (
          <div className="flex justify-end">
            <span className="text-right">{orderAmount}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "transcationFee",
      header: () => (
        <div className="flex items-center text-right justify-end gap-[2px] flex-1">
          <span>Transaction fees</span>
          <Image src={"/Main/info.svg"} height={14} width={14} />
        </div>
      ),
      cell: ({ row }) => {
        const transcationFee = row.getValue("transcationFee");
        return (
          <div className="flex items-center justify-end gap-[2px] text-black">
            <span>{transcationFee}</span>
          </div>
        );
      },
    },
  ];

  const [filterData, setFilterData] = useState(data);
  const [searchValue, setSearchValue] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const lastIndexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = lastIndexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, lastIndexOfLastItem);

  useEffect(() => {
    const searchedData = data.filter((item) => {
      return item.orderId.toLowerCase().includes(searchValue.toLowerCase());
    });

    setFilterData(searchedData);
  }, [searchValue]);

  return (
    <main className="h-screen w-screen flex ">
      <Navbar />
      <main className="w-full h-full">
        <div className="h-[64px] border-b-[1px] border-[#D9D9D9] px-[32px] py-[12px] w-full flex gap-4">
          <div className="bg-white w-full flex gap-4 items-center">
            <span className=" text-[15px]  leading-[22px] ">Payments</span>
            <div className="flex items-center gap-[6px]">
              <Image src={"/Main/question.svg"} height={14} width={14} />
              <span className="text-[#4D4D4D]">How it works</span>
            </div>
          </div>
          <div className="bg-white w-full flex gap-2 items-center rounded-[6px]">
            <Image src={"/Main/search.svg"} height={16} width={16} />
            <Input
              className="h-[22px] p-0 rounded-none "
              placeholder="Search features, tutorials, etc."
            />
          </div>
          <div className="bg-white w-full flex items-center justify-end gap-[12px]">
            <div className="h-[40px] w-[40px] bg-[#E6E6E6] rounded-full flex items-center justify-center">
              <Image src={"/Main/notifications.svg"} height={20} width={20} />
            </div>
            <Image src={"/Main/arrow-down.svg"} height={40} width={40} />
          </div>
        </div>

        <div className="m-[32px]">
          <div className="flex justify-between">
            <span className="text-[#1A181E] font-medium leading-[28px] text-[20px]">
              Overview
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger className="h-[36px] px-[14px] py-[6px] rounded-sm border-[1px] border-[#D9D9D9]">
                <div className="flex gap-[7px]">
                  <span className="leading-[24px] text-[#4D4D4D]">
                    Last Month
                  </span>
                  <Image
                    src={"/Main/arrow-dropdown.svg"}
                    height={16}
                    width={16}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Last Month</DropdownMenuItem>
                <DropdownMenuItem>Last 3 Month</DropdownMenuItem>
                <DropdownMenuItem>Last 6 Month</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex gap-[20px] mt-[24px] mb-[32px]">
            <MainStat name="Online orders" stat="231" />
            <MainStat name="Amount received" stat="₹23,92,312.19" />
          </div>

          <div className="mb-[20px]">
            <span className="text-[#1A181E] font-medium leading-[28px] text-[20px]">
              Transactions | This Month
            </span>
          </div>

          <div className="p-[12px] pb-[24px]">
            <div className="flex justify-between mb-[12px]">
              <div className="bg-white  flex gap-2 items-center rounded-[6px]">
                <Image src={"/Main/search.svg"} height={16} width={16} />
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="h-[22px] w-auto p-0 rounded-none "
                  placeholder="Search by order ID..."
                />
              </div>

              <div className="flex gap-[12px]">
                <div className="h-[36px] flex items-center gap-[6px] px-[12px] py-[6px] rounded-sm border-[1px] border-[#D9D9D9]">
                  <span className="leading-[24px] text-[#4D4D4D]">Sort</span>
                  <Image src={"/Main/arrow.svg"} height={16} width={16} />
                </div>
                <div className="h-[36px] flex items-center gap-[6px] p-2 rounded-sm border-[1px] border-[#D9D9D9]">
                  <Image src={"/Main/download.svg"} height={20} width={20} />
                </div>
              </div>
            </div>

            <DataTable columns={columns} data={currentItems} />
            <PaginationSection
              totalItems={filterData.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </main>
  );
}
