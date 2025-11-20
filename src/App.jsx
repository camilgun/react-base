import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";

const App = () => {
  return (
    <div>
      <h1>Padre Gino's</h1>
      <Pizza
        name="Peperoni Pizza"
        description="Mozzarella and pepperoni"
        image="/public/pizzas/pepperoni.webp"
      />
      <Pizza
        name="Margherita Pizza"
        description="Tomato, mozzarella, and basil"
        image="/public/pizzas/sicilian.webp"
      />
      <Pizza
        name="Hawaiian Pizza"
        description="Ham, pineapple, and cheese"
        image="/public/pizzas/hawaiian.webp"
      />
      <Pizza
        name="Veggie Pizza"
        description="Bell peppers, onions, mushrooms, and olives"
        image="/public/pizzas/ital_veggie.webp"
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
