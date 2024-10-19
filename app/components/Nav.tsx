"use client";

import { useGetProductQuery } from "@/lib/features/products/productSlice";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const pathname = usePathname();

  const { data, isError, isLoading, isSuccess } = useGetProductQuery();

  return (
    <nav className="flex flex-row [direction:rtl] mt-[20px] mx-[20px] ">
      {data &&
        data.products.map((product) => (
          <Link
            className={clsx(
              "px-[20px] py-[5px] font-bold cursor-pointer h-fit",
              {
                "border-b-[2px] text-orange-600 border-b-orange-500 border-x-[0.5px] border-x-gray-400 bg-gray-50":
                  pathname === `/products/${product.id}`,
              }
            )}
            key={product.id}
            href={`/products/${product.id}`}
          >
            {product.title}
          </Link>
        ))}
    </nav>
  );
};
