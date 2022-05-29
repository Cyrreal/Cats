import type { Cat } from "../App";
type Props = {
  cat: Cat;
  isFavorite: boolean;
  removeFromFavorites: (cat: Cat) => void;
  addToFavorites?: (cat: Cat) => void;
};

export function Card({
  cat,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
}: Props) {
  const handleClick =
    addToFavorites && !isFavorite ? addToFavorites : removeFromFavorites;
  return (
    <div className="grid-item">
      <img
        className="img"
        src={cat.url}
        width={cat.width}
        height={cat.height}
        alt="cat"
      />
      <button
        onClick={() => handleClick(cat)}
        className={isFavorite ? "licked" : "btn"}
      ></button>
    </div>
  );
}
