import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Recipe from "./components/Recipe";
import Favorite from "./components/Favorite";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/details/:id" element={<Details/>}/>
        <Route path="recipe" element={<Recipe/>}/>
        <Route path="fav" element={<Favorite/>}/>
      </Routes>
    </div>
  );
}

export default App;
