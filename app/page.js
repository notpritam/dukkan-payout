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
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function Home() {
  const [dateFilter, setDateFilter] = useState(false);

  const data = [];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 0; i < 500; i++) {
    const randomDay = Math.floor(Math.random() * 28) + 1; // random day between 1 and 28
    const randomMonth = months[Math.floor(Math.random() * 12)]; // random month
    const randomYear = Math.floor(Math.random() * 5) + 2020; // random year between 2020 and 2024
    const randomId = Math.floor(Math.random() * 10000) + 23343; // random ID
    const randomAmount = Math.floor(Math.random() * 10000) + 23000; // random amount
    const randomFee = Math.floor(Math.random() * 100) + 22; // random fee

    data.push({
      orderId: "#" + randomId,
      orderDate: `${randomDay} ${randomMonth} ${randomYear}`,
      orderAmount: `₹${randomAmount}`,
      transcationFee: `₹${randomFee}`,
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
        return (
          <span className="text-[#146EB4] font-medium text-[14px] leading-[20px]">
            {orderId}
          </span>
        );
      },
    },
    {
      accessorKey: "orderDate",
      header: () => (
        <div className="flex items-center gap-[2px] flex-1">
          <span>Order date</span>
          <Image
            onClick={() => setDateFilter(!dateFilter)}
            src={"/Main/table-down.svg"}
            className={cn(dateFilter && "transform rotate-180")}
            height={8}
            width={8}
          />
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
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const lastIndexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = lastIndexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, lastIndexOfLastItem);

  useEffect(() => {
    const searchedData = data.filter((item) => {
      return item.orderId.toLowerCase().includes(searchValue.toLowerCase());
    });

    const dateFilteredData = searchedData.sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);

      if (dateFilter) {
        // Ascending order
        return dateA - dateB;
      } else {
        // Descending order
        return dateB - dateA;
      }
    });

    setFilterData(dateFilteredData);
  }, [searchValue, dateFilter]);

  return (
    <main className="h-screen w-screen flex flex-col lg:flex-row lg:overflow-hidden ">
      <Navbar />
      <main className="w-full flex flex-col h-full pb-[32px]">
        <div className="h-[64px] border-b-[1px] border-[#D9D9D9] px-[32px] py-[12px] w-full flex gap-4">
          <div className="bg-white w-full flex gap-4 items-center">
            <span className=" text-[15px]  leading-[22px] ">Payments</span>
            <div className="hidden lg:flex items-center gap-[6px]">
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

        <div className="p-[32px] pb-[0]  flex flex-col">
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

          <div className="p-[12px] flex-1 bg-white flex flex-col  h-full">
            <div className="flex justify-between mb-[12px]">
              <div className="px-[16px] py-[10px] border-[1px] border-[#D9D9D9] flex gap-2 items-center rounded-[6px]">
                <Image src={"/Main/tableSearch.svg"} height={16} width={16} />
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="h-[22px] placeholder:text-[#999999] w-auto p-0 rounded-none "
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
          </div>
        </div>
        <DataTable columns={columns} data={currentItems} />
        <PaginationSection
          totalItems={filterData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </main>
  );
}
