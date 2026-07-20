import React from "react";
import Link from "next/link";
import { formatCurrency } from "@/utils/cart";

interface NavbarProps {
  itemCount: number;
  total: number;
}

const Navbar = ({ itemCount, total }: NavbarProps) => {
  const formattedTotal = formatCurrency(total);

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <img className="h-auto w-28 sm:w-auto" src="/img/logo.svg" alt="Kanakam Home Foods" />
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden text-sm text-[#16A34A] bg-[#F0FDF4] border-[#D1FFE1] border rounded-3xl p-3 lg:block">
              Open Now | Closes at 9:30 PM
            </div>
            <div className="hidden bg-[#F1941B] cursor-pointer text-white p-3 gap-2 items-center rounded-xl sm:flex">
              <img className="size-6" src="/img/Vector.svg" alt="" />
              <span className="font-semibold">MENU</span>
            </div>
            <Link
              href="/cart"
              className="flex bg-[#55240A] cursor-pointer text-white p-3 gap-2 items-center rounded-xl sm:p-4"
            >
              <img className="size-6" src="/img/Vector (1).svg" alt="" />
              <span className="font-semibold">
                CART{" "}
                <span className="bg-[#DC2626] py-1 px-2 rounded-full">
                  {itemCount}
                </span>
              </span>
              <span className="hidden font-semibold sm:inline">{formattedTotal}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
