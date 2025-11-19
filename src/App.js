import React from "react";
import { createRoot } from "react-dom/client";

const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Padre Gino's"),
    React.createElement(Pizza, {
      name: "Peperoni Pizza",
      description: "Mozzarella and pepperoni",
    }),
    React.createElement(Pizza, {
      name: "Margherita Pizza",
      description: "Tomato, mozzarella, and basil",
    }),
    React.createElement(Pizza, {
      name: "Hawaiian Pizza",
      description: "Ham, pineapple, and cheese",
    }),
    React.createElement(Pizza, {
      name: "Veggie Pizza",
      description: "Bell peppers, onions, mushrooms, and olives",
    }),
  ]);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
