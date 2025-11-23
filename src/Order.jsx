import { useState, useEffect, useMemo } from "react";
import Pizza from "./Pizza";
import Chart from "./Chart";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [chart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const pizzaMap = useMemo(() => new Map(pizzaTypes.map((p) => [p.id, p]) ), [pizzaTypes]);
  const selectedPizza = pizzaMap.get(pizzaType);
  const price = selectedPizza ? selectedPizza.sizes[pizzaSize] : 0;

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
      <div>
        <h2>Create order</h2>
        <form onSubmit={(e)=> {
          e.preventDefault();
          setCart([...chart, {pizza: selectedPizza, size: pizzaSize}])
        }}>
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
              <button type="submit">Add to cart</button>
            </div>
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
      <Chart chart={chart} />
    </div>
  );
}
