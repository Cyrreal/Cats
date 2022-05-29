import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Favorites } from "./Pages/Favorites";
import { Home } from "./Pages/Home";
import { useEffect, useState } from "react";

export type Cats = {
  width: number;
  height: number;
  id: string;
  url: string;
};

function App() {
  const [fetchData, setfetchData] = useState<Cats[]>([]);
  const [favorites, setFavorites] = useState<Cats[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  //Запрос котов с сервера
  useEffect(() => {
    if (fetching) {
      fetch(
        `https://api.thecatapi.com/v1/images/search?limit=20&page=${currentPage}`,
        {
          mode: "cors",
          headers: {
            "x-api-key": "c2e35dca-e23e-41d2-a7a0-5f9ca44a3ba5",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setfetchData([...fetchData, ...data]);
          setCurrentPage((prevState) => prevState + 1);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  //Получение понравившихся котов из LocalStorage
  useEffect(() => {
    const catsFavorites = JSON.parse(
      localStorage.getItem("favorite-cats") || ""
    );
    setFavorites(catsFavorites);
  }, []);

  //Слушатели скрола для бесконечного скрола
  useEffect(() => {
    document.addEventListener("scroll", scrollPage);
    return function () {
      document.removeEventListener("scroll", scrollPage);
    };
  }, []);

  //Условия для срабатывания слушателя скрола
  const scrollPage = (event: any) => {
    if (
      event.target.documentElement.scrollHeight -
        (event.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  //Добавление кота в LocalStorage
  const saveToLocalStorage = (items: any) => {
    localStorage.setItem("favorite-cats", JSON.stringify(items));
  };

  //функция добавления
  const addToFav = (id: string) => {
    const likedItem: any = fetchData.find((item: any) => item.id === id);
    if (favorites.includes(likedItem)) return;
    setFavorites([...favorites, likedItem]);
    saveToLocalStorage([...favorites, likedItem]);
  };
  //Функция удаления
  const deleteFavorites = (id: string) => {
    const unlikedItem: any = favorites.filter((item) => item.id !== id);
    setFavorites(unlikedItem);
    saveToLocalStorage(unlikedItem);
  };

  return (
    <>
      <header>
        <div className="container">
          <nav className="header-menu">
            <p className="header-link_all">
              {" "}
              <Link to="/">Все котики</Link>
            </p>
            <p className="header-link_fav">
              <Link to="/favorites">Любимые котики</Link>
            </p>
          </nav>
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              fetchData={fetchData}
              addToFav={addToFav}
              fetching={fetching}
            />
          }
        ></Route>
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              deleteFavorites={deleteFavorites}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
