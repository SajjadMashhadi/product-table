"use client";

import { ReactNode, useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { toggleShowPrice } from "@/lib/features/price/priceSlice";
import { useAppDispatch } from "@/lib/hooks";

export default function layout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(toggleShowPrice(show));
  }, [show]);

  return (
    <div className="w-full text-[12px] ">
      <div className="">
        <h1 className="text-[16px] mb-[20px] ">تایید قیمت</h1>
        <div className="flex flex-row justify-between">
          <div>درخواست: 146</div>
          <div className="flex flex-row items-center gap-[10px] ">
            <input
              type="checkbox"
              checked={show}
              onChange={(e) => setShow(e.target.checked)}
              className="toggle toggle-md border-[orange] bg-[orange] [--tglbg:white] hover:bg-[orange] checked:[--tglbg:orange] checked:bg-white checked:hover:bg-[white]"
            />
            <div>محاسبه مجموع قیمت</div>
          </div>
        </div>
      </div>
      <div className="border-[1px] w-ful border-gray-200 rounded-[20px] p-[40px] mt-[20px] ">
        <div className="flex flex-row justify-end">
          <button>خروجی تیم تامین</button>
        </div>
        <Nav />
        <div className="mt-[5px] ">{children}</div>
      </div>
    </div>
  );
}
