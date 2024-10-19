import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ProductApiResponse } from "@/lib/types";

export const productSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/c/1c70-7ac1-4234-b47d",
  }),
  reducerPath: "productApi",

  tagTypes: ["Products"],
  endpoints: (build) => ({
    getProduct: build.query<ProductApiResponse, void>({
      query: () => ``,

      providesTags: (result, error, id) => [{ type: "Products" }],
    }),
  }),
});

export const { useGetProductQuery } = productSlice;
