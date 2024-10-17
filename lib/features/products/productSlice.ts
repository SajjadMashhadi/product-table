// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProductApiResponse {
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
    }[];
  }[];
  providersPriceDetails: { id: number; title: string; unit: number }[];
  providers: { provider: { id: number; name: string } }[];
}

// Define a service using a base URL and expected endpoints
export const productSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/c/1c70-7ac1-4234-b47d",
  }),
  reducerPath: "productApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Products"],
  endpoints: (build) => ({
    // Supply generics for the return type (in this case `QuotesApiResponse`)
    // and the expected query argument. If there is no argument, use `void`
    // for the argument type instead.
    getProduct: build.query<ProductApiResponse, void>({
      query: () => ``,
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      providesTags: (result, error, id) => [{ type: "Products" }],
    }),
  }),
});

// Hooks are auto-generated by RTK-Query
// Same as `quotesApiSlice.endpoints.getQuotes.useQuery`
export const { useGetProductQuery } = productSlice;
