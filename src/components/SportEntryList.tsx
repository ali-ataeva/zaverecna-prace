import { useHealth } from '../contexts/HealthContext';

export default function SportEntryList() {
  const { state } = useHealth();
  const { dailyData } = state;

  if (dailyData.sports.length === 0) {
    return (
      <div className="entry-list">
        <h3>Today's Exercise Entries</h3>
        <p className="no-entries">No exercise entries yet today. Get moving!</p>
      </div>
    );
  }

  return (
    <div className="entry-list">
      <h3>Today's Exercise Entries</h3>
      <div className="entries">
        {dailyData.sports.map((sport) => (
          <div key={sport.id} className="entry-item sport-entry">
            <div className="entry-header">
              <h4>{sport.activity}</h4>
              <span className="timestamp">
                {sport.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
            <div className="entry-details">
              <span className="duration">{sport.duration} min</span>
              <span className="calories-burned">{Math.round(sport.caloriesBurned)} kcal burned</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 