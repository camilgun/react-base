const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export default function Chart({ chart, checkout }) {
  let total = 0;
  for (let i = 0; i < chart.length; i++) {
    const current = chart[i];
    total += current.pizza.sizes[current.size];
  }

  return (
    <div className="chart">
      <h2>Chart</h2>
      <ul>
        {chart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> -
            <span className="type">{item.pizza.name}</span> -
            <span className="price">{intl.format(item.pizza.sizes[item.size])}</span>
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button onClick={checkout}>Place Order</button>
    </div>
  );
}

