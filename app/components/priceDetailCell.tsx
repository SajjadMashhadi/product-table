"use client";

import { useGetProductQuery } from "@/lib/features/products/productSlice";
import {
  incrementUSD,
  incrementEUR,
  decrementEUR,
  decrementUSD,
  selectShowPrice,
} from "@/lib/features/price/priceSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import Cell from "../ui/cell";
import { useEffect, useState } from "react";
import CellItemList from "../ui/cellItemList";
import Form from "./form";

const currencyText: { USD: string; EUR: string } = {
  USD: "دلار",
  EUR: "یورو",
};

export default function PriceDetailCell({
  providerName,
  itemName,
}: {
  providerName: string;
  itemName: string;
}) {
  const showPrice = useAppSelector(selectShowPrice);
  const dispatch = useAppDispatch();
  const { data, isError, isLoading, isSuccess } = useGetProductQuery();

  const [detailItem, setDetailItem] = useState(null);
  const [provider, setProvider] = useState(null);
  const [include, setInclude] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (data) {
      const findItem = data.providersPriceDetails.find(
        (item) =>
          item.title === itemName &&
          item.providers.find((p) => p.provider.name === providerName)
      );

      setDetailItem(findItem);
    }
  }, [data]);

  useEffect(() => {
    if (detailItem) {
      const findProvider = detailItem.providers.find(
        (item) => item.provider.name === providerName
      );
      setProvider(findProvider);
      setTotalPrice(
        ((findProvider.price * (100 - findProvider.discount)) / 100) *
          findProvider.quantity
      );
    }
  }, [detailItem]);

  useEffect(() => {
    if (provider) {
      if (include) {
        if (provider.currency === "USD") {
          dispatch(incrementUSD(totalPrice));
        } else {
          dispatch(incrementEUR(totalPrice));
        }
      } else {
        if (provider.currency === "USD") {
          dispatch(decrementUSD(totalPrice));
        } else {
          dispatch(decrementEUR(totalPrice));
        }
      }
    }
  }, [include]);

  if (data && detailItem && provider) {
    return (
      <Cell className="relative">
        {showPrice && (
          <div className="absolute left-[5px] top-[5px] ">
            <input
              type="checkbox"
              checked={include}
              onChange={(e) => setInclude(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary "
            />
          </div>
        )}
        {showFormModal && (
          // <dialog className="modal show">
          <div className="fixed top-[5%] left-[15%] z-[1000] modal-box w-[70%]  max-w-[70%] p-0">
            <div className="flex flex-row justify-between border-b-[1px] border-gray-300 w-full p-[20px] ">
              <h3 className="font-bold text-[16px] ">تایید قیمت نهایی</h3>
              <button
                onClick={() => setShowFormModal(false)}
                className=" border-none btn-sm btn-circle outline-none "
              >
                ✕
              </button>
            </div>

            <div className="modal-action w-full p-[20px] ">
              {provider && (
                <Form
                  key={detailItem.id}
                  providerName={providerName}
                  title={itemName}
                  partNumber={detailItem.partNumber}
                  currencyType={provider.currency}
                  close={() => setShowFormModal(false)}
                />
              )}
            </div>
          </div>
          //  </dialog>
        )}
        <div
          onClick={() => {
            setShowFormModal(true);
            // return document.getElementById("my_modal_1").showModal();
          }}
          className="w-full flex flex-col items-center gap-[5px] hover:cursor-pointer "
        >
          <CellItemList tag="نوع ارز" text={currencyText[provider.currency]} />
          <CellItemList tag="وضعیت کالا" text={provider.productStatus.title} />
          <CellItemList tag="تعداد تایید شده" text={provider.quantity} />
          <CellItemList
            tag="درصد تخفیف"
            text={provider.discount === 0 ? "-" : provider.discount.toString()}
          />
          <CellItemList
            tag="قیمت واحد نهایی"
            text={(
              (provider.price * (100 - provider.discount)) /
              100
            ).toString()}
          />
          <CellItemList tag="قیمت کل نهایی" text={totalPrice.toString()} />
        </div>
      </Cell>
    );
  }
  return null;
}
