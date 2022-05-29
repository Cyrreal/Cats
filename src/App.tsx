import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Favorites } from "./Pages/Favorites";
import { Home } from "./Pages/Home";
import { useEffect, useState } from "react";

export type Cat = {
  width: number;
  height: number;
  id: string;
  url: string;
};

function App() {
  const saved: Cat[] = JSON.parse(localStorage.getItem("favorites") || "[]");
  const [favorites, setFavorites] = useState<Cat[]>(saved);

  //Добавление в любимые
  const addToFavorites = (cat: Cat) => {
    if (favorites.includes(cat)) return;
    setFavorites([...favorites, cat]);
  };
  // Удаление из Любимых
  const removeFromFavorites = (cat: Cat) => {
    const filtered: any = favorites.filter((item) => item !== cat);
    setFavorites(filtered);
  };

  useEffect(() => {
    // localStorage.setItem('favorite-Cats',JSON.stringify(favorites));
    localStorage.favorites = JSON.stringify(favorites);
  }, [favorites]);

  return (
    <>
      <header>
        <div className="container">
          <nav className="header-menu">
            <p className="header-link_all">
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
              favorites={favorites}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              // fetching={fetching}
            />
          }
        ></Route>
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
