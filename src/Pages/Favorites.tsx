import type { Cats } from "../App";
import { CardFav } from "../Components/CardFav";

type PropTypes = {
  favorites: Cats[];
  deleteFavorites: (item: string) => void;
};

export function Favorites({ favorites, deleteFavorites }: PropTypes) {
  return (
    <div className="container">
      <div className="cat-grid">
        {favorites.map((elem) => (
          <CardFav {...elem} key={elem.id} deleteFavorites={deleteFavorites} />
        ))}
      </div>
    </div>
  );
}
