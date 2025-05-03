import { useHealth } from '../contexts/HealthContext';
import { Link } from 'react-router-dom';

export default function SportSummaryCard() {
  const { state } = useHealth();
  const { totals } = state;

  return (
    <article className="sport">
      <h2>Sport Activity Tracking</h2>
      <ul>
        <li>Total Burned: <span id="totalBurned">{Math.round(totals.sport.caloriesBurned)}</span> kcal</li>
        <li>Total Exercise time: <span id="totalExerciseTime">{Math.round(totals.sport.exerciseTime)}</span> min</li>
      </ul>
      <Link to="/sport" className="button">+</Link>
    </article>
  );
} 