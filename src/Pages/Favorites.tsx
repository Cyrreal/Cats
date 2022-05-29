import type { Cat } from "../App";
import { Card } from "../Components/Card";

type PropTypes = {
  favorites: Cat[];
  removeFromFavorites: (cat: Cat) => void;
};

export function Favorites({ favorites, removeFromFavorites }: PropTypes) {
  return (
    <div className="container">
      <div className="cat-grid">
        {favorites.map((cat) => (
          <Card
            cat={cat}
            key={cat.id}
            isFavorite={true}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </div>
    </div>
  );
}
