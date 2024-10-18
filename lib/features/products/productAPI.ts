interface ProductData {
  products: {
    id: number;
    title: string;
    property: string;
    needDetailPrice: boolean;
    items: {
      supplyProductId: number;
      productId: number;
      title: string;
      quantity: number;
      subItems: {
        supplyProductId: number;
        title: string;
        productd: number;
      }[];
    }[];
  }[];
  providersPriceDetails: { id: number; title: string; unit: number }[];
  providers: {
    provider: { id: number; name: string };
    description: string;
    discount: number;
  }[];
}

export const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/c/1c70-7ac1-4234-b47d", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const result: { data: ProductData } = await response.json();

  return result;
};
