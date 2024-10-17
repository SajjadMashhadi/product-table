"use client";

import { useGetProductQuery } from "@/lib/features/products/productSlice";

import Cell from "../ui/cell";
import { useEffect, useState } from "react";

export default function PriceDetailCell({
  providerName,
  itemName,
}: {
  providerName: string;
  itemName: string;
}) {
  const { data, isError, isLoading, isSuccess } = useGetProductQuery();

  const [detailItem, setDetailItem] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (data) {
      const findProvider = data.providersPriceDetails.find((item) =>
        item.providers.find((p) => p.provider.name === providerName)
      );
      const findItem = data.providersPriceDetails.find(
        (item) =>
          item.title === itemName &&
          item.providers.find((p) => p.provider.name === providerName)
      );

      setDetailItem(findItem);
      setProvider(findProvider);
    }
  }, [data]);

  console.log(detailItem);

  if (data && detailItem && provider) {
    return (
      <Cell>
        <div>
          <div>{detailItem.title}</div>
          <div>
            {
              detailItem.providers.find(
                (item) => item.provider.name === providerName
              ).price
            }
          </div>
          <div>{provider.name}</div>
        </div>
      </Cell>
    );
  }
  return null;
}
