export interface Provider {
  id: number;
  name: string;
}

export interface Providers {
  provider: Provider[];
}

export interface PriceProvider {
  discount: number;
  price: number;
  currency: string;
  quantity: number;
  productStatus: {
    title: string;
  };
  provider: Provider[];
}

export interface PriceDetail {
  id: number;
  partNumber: string;
  title: string;
  unit: number;
  providers: PriceProvider[];
}

export interface Product {
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
      quantity: number;
      supplyProductId: number;
      title: string;
      productId: number;
    }[];
  }[];
}

export interface ProductApiResponse {
  products: Product[];
  providersPriceDetails: PriceDetail[];
  providers: Providers[];
}
