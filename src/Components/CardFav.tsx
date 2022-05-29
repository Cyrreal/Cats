type PropTypes = {
  url: string;
  id: string;
  deleteFavorites: (item: string) => void;
};

export function CardFav({ url, id, deleteFavorites }: PropTypes) {
  return (
    <div className="grid-item">
      <img className="img" src={url} alt="cat" />
      <button onClick={() => deleteFavorites(id)} className="licked"></button>
    </div>
  );
}
