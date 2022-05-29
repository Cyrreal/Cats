type PropTypes = {
  url: string;
  id: string;
  addToFav: (id: string) => void;
};

export function Card({ url, id, addToFav }: PropTypes) {
  return (
    <div className="grid-item">
      <img className="img" src={url} alt="cat" />
      <button onClick={() => addToFav(id)} className="btn"></button>
    </div>
  );
}
