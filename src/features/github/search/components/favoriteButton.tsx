"use client";
import { Star } from "lucide-react";
import { Repository } from "../types/repository";
import { FavoriteAction } from "../../favorite/actions/action";
import { useFavoriteStore } from "../../favorite/store/favoriteStore";
import { useEffect } from "react";
import { useSearchRepository } from "../hooks/useSearchRepository";

type Props = {
  repository: Repository;
};

export default function FavoriteButton({ repository }: Props) {
  const favoriteIds = useFavoriteStore((state) => state.favoriteIds);
  const addFavorite = useFavoriteStore((state) => state.addFavorite);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);
  const isFavorite = favoriteIds.includes(repository.id);
  const { favoriteData } = useSearchRepository();
  const setFavoriteIds = useFavoriteStore((state) => state.setFavoriteIds);

  
  const handleClick = async () => {
    // optimistic UI
    if (isFavorite) {
      removeFavorite(repository.id);
    } else {
      addFavorite({
        itemId: repository.id,
        itemTitle: repository.full_name,
      });
    }

    try {
      await FavoriteAction(1, repository.id, repository.full_name);
    } catch {
      // prismaに登録できなかった場合表示をもとに戻す
      if (isFavorite) {
        addFavorite({
          itemId: repository.id,
          itemTitle: repository.full_name,
        });
      } else {
        removeFavorite(repository.id);
      }
    }
  };
  useEffect(() => {
    if (favoriteData && favoriteData.length > 0) {
      const ids = favoriteData.flatMap((folder) =>
        folder.items.map((item) => item.itemId)
      );
      setFavoriteIds(ids);
    }
  }, [favoriteData, setFavoriteIds]);
  console.log(isFavorite);
  return (
    <button onClick={handleClick}>
      <Star
        className={`w-6 h-6 transition ${
          isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
        }`}
      />
    </button>
  );
}
