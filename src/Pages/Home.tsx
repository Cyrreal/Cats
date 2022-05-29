import type { Cats } from "../App";
import { Card } from "../Components/Card";

type PropTypes = {
  fetchData: Cats[];
  addToFav: (id: string) => void;
  fetching: boolean;
};

export function Home({ fetchData, addToFav, fetching }: PropTypes) {
  return (
    <div className="container">
      <div className="cat-grid">
        {fetchData.map((elem, index) => (
          <Card {...elem} key={index} addToFav={addToFav} />
        ))}
      </div>
      {fetching && (
        <div className="container">
          <p className="loader">Загружаем еще котиков...</p>
        </div>
      )}
    </div>
  );
}
