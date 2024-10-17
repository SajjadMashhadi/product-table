import { ReactNode } from "react";
import { Nav } from "../components/Nav";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full text-[12px] ">
      <div>
        <h1 className="text-[14px] mb-[20px] ">تایید قیمت</h1>
        <div className="flex flex-row justify-between">
          <div>درخواست: 146</div>
          <div>
            <span>محاسبه مجموع قیمت</span>
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
