import { useHealth } from '../contexts/HealthContext';
import { Link } from 'react-router-dom';

export default function LiquidSummaryCard() {
  const { state } = useHealth();
  const { totals } = state;

  return (
    <article className="liquid">
      <h2>Liquid Intake Tracker</h2>
      <ul>
        <li>Water: <span id="totalWater">{totals.liquids.water.toFixed(1)}</span> l</li>
        <li>Soft drinks: <span id="totalSoftDrinks">{totals.liquids.softDrinks.toFixed(1)}</span> l</li>
        <li>Juice drinks: <span id="totalJuice">{totals.liquids.juice.toFixed(1)}</span> l</li>
        <li>Milk: <span id="totalMilk">{totals.liquids.milk.toFixed(1)}</span> l</li>
        <li>Spirits: <span id="totalSpirits">{totals.liquids.spirits.toFixed(1)}</span> l</li>
      </ul>
      <Link to="/liquid" className="button">+</Link>
    </article>
  );
} 