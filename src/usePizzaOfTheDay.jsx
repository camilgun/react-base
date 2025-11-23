import { useState, useEffect } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      const res = await fetch("/api/pizza-of-the-day");
      const pizzaJson = await res.json();
      setPizzaOfTheDay(pizzaJson);
    }
    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
}
