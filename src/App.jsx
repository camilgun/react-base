import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import PizzaOfTheDay from "./PizzaOfTheDay";

import Order from "./Order";

const App = () => {
  return (
    <div>
      <h1 className="logo">Padre Gino's</h1>
      <Order />
      <PizzaOfTheDay />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
