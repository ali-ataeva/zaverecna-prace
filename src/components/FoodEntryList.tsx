import { useHealth } from '../contexts/HealthContext';

export default function FoodEntryList() {
  const { state } = useHealth();
  const { dailyData } = state;

  if (dailyData.foods.length === 0) {
    return (
      <div className="entry-list">
        <h3>Today's Food Entries</h3>
        <p className="no-entries">No food entries yet today. Add your first meal!</p>
      </div>
    );
  }

  return (
    <div className="entry-list">
      <h3>Today's Food Entries</h3>
      <div className="entries">
        {dailyData.foods.map((food) => (
          <div key={food.id} className="entry-item food-entry">
            <div className="entry-header">
              <h4>{food.name}</h4>
              <span className="timestamp">
                {food.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
            <div className="entry-details">
              <span className="calories">{Math.round(food.calories)} kcal</span>
              <div className="macros">
                <span>P: {Math.round(food.protein)}g</span>
                <span>C: {Math.round(food.carbs)}g</span>
                <span>F: {Math.round(food.fats)}g</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 