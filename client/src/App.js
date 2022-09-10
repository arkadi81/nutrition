import "./styles.css";
import { Routes, Route, Switch, Link } from "react-router-dom";
import ItemNutrients from "./components/ItemNutrients";
import FoodSearchBar from "./components/FoodSearchBar";
import Home from "./components/Home";

export default function App() {
  return (
    <div className="App">
      {/* menu */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/search" element={<FoodSearchBar />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      {/* <Route path="/test" component = {<ItemNutrients/>}/> */}

      {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some m agic happen!</h2> */}
      {/* <ItemNutrients /> */}
    </div>
  );
}
