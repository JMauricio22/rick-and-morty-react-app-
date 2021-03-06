export default function getFavoritesFromLocalStorage() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesMapper = favorites.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
  return favoritesMapper;
}
