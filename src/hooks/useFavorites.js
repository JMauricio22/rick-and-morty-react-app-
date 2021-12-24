import { useState } from "react";
import getFavorites from "../utils/getFavoritesFromLocalStorage";

export default function useFavorites() {
  const [favorites, setFavorites] = useState(getFavorites());

  const updateFavorites = () => {
    setFavorites(getFavorites());
  };

  return [favorites, updateFavorites];
}
