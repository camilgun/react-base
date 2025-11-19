import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";

const App = () => {
  return (
    <div>
      <h1>Padre Gino's</h1>
      <Pizza name="Peperoni Pizza" description="Mozzarella and pepperoni" />
      <Pizza name="Margherita Pizza" description="Tomato, mozzarella, and basil" />
      <Pizza name="Hawaiian Pizza" description="Ham, pineapple, and cheese" />
      <Pizza name="Veggie Pizza" description="Bell peppers, onions, mushrooms, and olives" />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
