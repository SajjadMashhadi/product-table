"use client";

import { useGetProductQuery } from "@/lib/features/products/productSlice";
import {
  selectUSD,
  selectEUR,
  resetPrice,
} from "@/lib/features/price/priceSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import Cell from "@/app/ui/cell";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import PriceDetailCell from "@/app/components/priceDetailCell";
import TotalColPrice from "@/app/ui/totalColPrice";
import { useEffect } from "react";

export default function Products() {
  const dispatch = useAppDispatch();
  const usd = useAppSelector(selectUSD);
  const eur = useAppSelector(selectEUR);

  const pathname = usePathname();

  const { data, isError, isLoading, isSuccess } = useGetProductQuery();

  useEffect(() => {
    dispatch(resetPrice());
  }, []);

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
        <table className="w-full border-[0.5px] border-orange-200 ">
          <thead className="flex flex-row  [direction:rtl]">
            <Cell className=" max-w-[10%] h-[100px] max-h-[100px] ">
              <div className="font-bold">#</div>
            </Cell>

            <Cell className=" h-[100px] max-h-[100px] font-bold">
              <div className="flex flex-col w-full h-full">
                <div className="h-1/2 border-b-[1px] border-b-gray-200 w-full flex flex-col justify-center items-center ">
                  تامین کننده
                </div>
                <div className="h-1/2 w-full flex flex-col justify-center items-center ">
                  محصولات
                </div>{" "}
              </div>
            </Cell>

            {data.providers.map((provider, index) => (
              <Cell
                className={clsx("h-[100px] max-h-[100px]", {
                  " ": index !== data.providers.length - 1,
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
              <>
                <tr
                  key={item.productId}
                  className="flex flex-row  [direction:rtl]"
                >
                  <Cell className=" max-w-[10%]">
                    <div>{index + 1}</div>
                  </Cell>
                  <Cell className="">
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
                {item.subItems.length > 0 &&
                  item.subItems.map((sub, subIndex) => (
                    <tr
                      key={sub.productId}
                      className="flex flex-row  [direction:rtl]"
                    >
                      <Cell className="max-w-[10%]">
                        <div>{`${subIndex + 1} - ${index + 1}`}</div>
                      </Cell>
                      <Cell>
                        <div>{sub.title}</div>
                      </Cell>
                      <PriceDetailCell
                        providerName={data.providers[0].provider.name}
                        itemName={sub.title}
                      />
                      <PriceDetailCell
                        providerName={data.providers[1].provider.name}
                        itemName={sub.title}
                      />
                    </tr>
                  ))}
              </>
            ))}
          <tr className="flex flex-row  [direction:rtl]">
            <Cell className=" max-w-[10%] h-[100px] max-h-[100px] bg-transparent ">
              <div className="font-bold text-[11px]">مجموع انتخاب شده</div>
            </Cell>
            <Cell className="  h-[100px] max-h-[100px] bg-transparent  ">
              <div className="font-bold"></div>
            </Cell>
            <Cell className="  h-[100px] max-h-[100px] bg-transparent  ">
              <div className="font-bold">
                <TotalColPrice title="یورو" total={eur} />
              </div>
            </Cell>
            <Cell className="  h-[100px] max-h-[100px] bg-transparent  ">
              <div className="font-bold">
                <TotalColPrice title="دلار" total={usd} />
              </div>
            </Cell>
          </tr>
        </table>
      </div>
    );
  }

  return null;
}
