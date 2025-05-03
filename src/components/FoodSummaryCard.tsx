import { useHealth } from '../contexts/HealthContext';
import { Link } from 'react-router-dom';

export default function FoodSummaryCard() {
  const { state } = useHealth();
  const { totals } = state;

  return (
    <article className="food">
      <h2>Today's Intake</h2>
      <p>Total Calories: <span id="totalCalories">{Math.round(totals.calories)}</span> kcal</p>
      <div className="macros">
        <p>Protein: <span id="totalProtein">{Math.round(totals.protein)}</span> g</p>
        <p>Carbs: <span id="totalCarbs">{Math.round(totals.carbs)}</span> g</p>
        <p>Fats: <span id="totalFats">{Math.round(totals.fats)}</span> g</p>
      </div>
      <Link to="/food" className="button">+</Link>
    </article>
  );
} 