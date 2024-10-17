"use client";

import { useGetProductQuery } from "@/lib/features/products/productSlice";
import Cell from "@/app/ui/cell";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import PriceDetailCell from "@/app/components/priceDetailCell";

export default function Products() {
  const pathname = usePathname();
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } = useGetProductQuery();

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div>
        <table>
          <thead className="flex flex-row  [direction:rtl]">
            <Cell className="border-l-0 max-w-[100px] h-[100px] ">
              <div className="font-bold">#</div>
            </Cell>

            <Cell className="border-l-0 h-[100px] font-bold">
              <div className="flex flex-col w-full h-full">
                <div className="h-1/2 border-b-[0.5px] border-b-gray-200 w-full flex flex-col justify-center items-center ">
                  تامین کننده
                </div>
                <div className="h-1/2 w-full flex flex-col justify-center items-center ">
                  محصولات
                </div>{" "}
              </div>
            </Cell>

            {data.providers.map((provider, index) => (
              <Cell
                className={clsx("h-[100px]", {
                  "border-l-0": index !== data.providers.length - 1,
                })}
                key={provider.provider.id}
              >
                <div>{provider.provider.name}</div>
              </Cell>
            ))}
          </thead>

          {data.products
            .find((product) => `/products/${product.id}` === pathname)
            ?.items.map((item, index) => (
              <tr
                key={item.productId}
                className="flex flex-row  [direction:rtl]"
              >
                <Cell className="max-w-[100px]">
                  <div>{index + 1}</div>
                </Cell>
                <Cell>
                  <div>{item.title}</div>
                </Cell>
                <PriceDetailCell
                  providerName={data.providers[0].provider.name}
                  itemName={item.title}
                />
                <PriceDetailCell
                  providerName={data.providers[1].provider.name}
                  itemName={item.title}
                />
              </tr>
            ))}
        </table>
      </div>
    );
  }

  return null;
}
