import { useState, useEffect, useMemo, useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import Pizza from "../Pizza";
import Cart from "../Cart";
import { CartContext } from "../contexts";

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useContext(CartContext);

  const pizzaMap = useMemo(
    () => new Map(pizzaTypes.map((p) => [p.id, p])),
    [pizzaTypes],
  );
  const selectedPizza = pizzaMap.get(pizzaType);
  const price = selectedPizza ? selectedPizza.sizes[pizzaSize] : 0;

  async function checkout() {
    setLoading(true);
    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });
    setCart([]);
    setLoading(false);
  }

  async function fetchPizzaTypes() {
    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();
    setPizzaTypes(pizzaJson);
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create order</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCart([...cart, { pizza: selectedPizza, size: pizzaSize }]);
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                onChange={(e) => setPizzaType(e.target.value)}
                id="pizza-type"
                name="pizza-type"
                value={pizzaType}
              >
                {pizzaTypes.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    checked={pizzaSize === "S"}
                    type="radio"
                    id="size-s"
                    name="pizza-size"
                    value="S"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="size-s">Small</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "M"}
                    type="radio"
                    id="size-m"
                    name="pizza-size"
                    value="M"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="size-m">Medium</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "L"}
                    type="radio"
                    id="size-l"
                    name="pizza-size"
                    value="L"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="size-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          <div className="order-pizza">
            <Pizza
              name={selectedPizza.name}
              description={selectedPizza.description}
              image={selectedPizza.image}
            />
            <p>{intl.format(price)}</p>
          </div>
        </form>
      </div>
      <Cart cart={cart} checkout={checkout} />
    </div>
  );
}
