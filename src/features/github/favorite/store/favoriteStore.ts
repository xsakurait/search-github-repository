import { create } from "zustand";

type FavoriteItem = {
  itemId: number;
  itemTitle: string;
};

type FavoriteStore = {
  favoriteIds: number[];

  favoriteItems: FavoriteItem[];

  addFavorite: (item: FavoriteItem) => void;

  removeFavorite: (id: number) => void;
};

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favoriteIds: [],

  favoriteItems: [],

  addFavorite: (item) =>
    set((state) => ({
      favoriteIds: [...state.favoriteIds, item.itemId],
      favoriteItems: [...state.favoriteItems, item],
    })),

  removeFavorite: (id: number) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.filter((favoriteId) => favoriteId !== id),
      favoriteItems: state.favoriteItems.filter((item) => item.itemId !== id),
    })),
}));
