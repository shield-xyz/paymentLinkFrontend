import { create } from 'zustand';

export const useStore = create((set) => ({
  side: 'buy',
  selectedNetwork: null,
  selectedAsset: null,
  amount: 0,
  setSide: (side) => set({ side }),
  setNetwork: (selectedNetwork) => set({ selectedNetwork }),
  setAsset: (selectedAsset) => set({ selectedAsset }),
  setAmount: (amount) => set({ amount }),
}));
