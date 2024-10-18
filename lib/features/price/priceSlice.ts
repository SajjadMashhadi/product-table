import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PriceSliceState {
  USD: number;
  EUR: number;
  showPrice: boolean;
}

const initialState: PriceSliceState = {
  USD: 0,
  EUR: 0,
  showPrice: false,
};

export const priceSlice = createAppSlice({
  name: "price",
  initialState,
  reducers: (create) => ({
    incrementUSD: create.reducer((state, action: PayloadAction<number>) => {
      state.USD += action.payload;
    }),
    incrementEUR: create.reducer((state, action: PayloadAction<number>) => {
      state.EUR += action.payload;
    }),
    decrementUSD: create.reducer((state, action: PayloadAction<number>) => {
      state.USD -= action.payload;
    }),
    decrementEUR: create.reducer((state, action: PayloadAction<number>) => {
      state.EUR -= action.payload;
    }),
    toggleShowPrice: create.reducer((state, action: PayloadAction<boolean>) => {
      state.showPrice = action.payload;
    }),
  }),

  selectors: {
    selectUSD: (price) => price.USD,
    selectEUR: (price) => price.EUR,
    selectShowPrice: (price) => price.showPrice,
  },
});

export const {
  incrementUSD,
  incrementEUR,
  decrementUSD,
  decrementEUR,
  toggleShowPrice,
} = priceSlice.actions;

export const { selectUSD, selectEUR, selectShowPrice } = priceSlice.selectors;
