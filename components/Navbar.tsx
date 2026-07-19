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
      <div className="bg-white sticky top-0">
        <div className="p-4 flex justify-between items-center container mx-auto">
          <img src="/img/logo.svg" alt="" />
          <div className="flex items-center gap-4">
            <div className="text-[#16A34A] bg-[#F0FDF4] border-[#D1FFE1] border rounded-3xl p-3">
              Open Now | Closes at 9:30 PM
            </div>
            <div className="flex bg-[#F1941B] cursor-pointer text-white p-4 gap-2 items-center rounded-xl">
              <img className="size-6" src="/img/Vector.svg" alt="" />
              <span className="font-semibold">MENU</span>
            </div>
            <Link
              href="/cart"
              className="flex bg-[#55240A] cursor-pointer text-white p-4 gap-2 items-center rounded-xl"
            >
              <img className="size-6" src="/img/Vector (1).svg" alt="" />
              <span className="font-semibold">
                CART{" "}
                <span className="bg-[#DC2626] py-1 px-2 rounded-full">
                  {itemCount}
                </span>
              </span>
              <span className="font-semibold">{formattedTotal}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
