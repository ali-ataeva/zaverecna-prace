import { useState } from 'react';
import { useHealth } from '../contexts/HealthContext';

interface SportFormProps {
  onSubmit?: () => void;
}

export default function SportForm({ onSubmit }: SportFormProps) {
  const { addSport } = useHealth();
  const [formData, setFormData] = useState({
    activity: '',
    duration: '',
    caloriesBurned: '',
  });

  const commonActivities = [
    { name: 'Walking', caloriesPerMinute: 3.5 },
    { name: 'Running', caloriesPerMinute: 8.5 },
    { name: 'Cycling', caloriesPerMinute: 6.0 },
    { name: 'Swimming', caloriesPerMinute: 7.0 },
    { name: 'Weight Training', caloriesPerMinute: 4.5 },
    { name: 'Yoga', caloriesPerMinute: 2.5 },
    { name: 'Basketball', caloriesPerMinute: 8.0 },
    { name: 'Soccer', caloriesPerMinute: 7.5 },
    { name: 'Tennis', caloriesPerMinute: 6.5 },
    { name: 'Dancing', caloriesPerMinute: 4.0 },
  ];

  const commonDurations = [15, 30, 45, 60, 90, 120]; // in minutes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.activity || !formData.duration) {
      alert('Please fill in activity name and duration');
      return;
    }

    const duration = parseFloat(formData.duration);
    const caloriesBurned = parseFloat(formData.caloriesBurned) || 0;

    if (duration <= 0) {
      alert('Please enter a valid duration');
      return;
    }

    addSport({
      activity: formData.activity,
      duration: duration,
      caloriesBurned: caloriesBurned,
    });

    setFormData({
      activity: '',
      duration: '',
      caloriesBurned: '',
    });

    onSubmit?.();
  };

  const handleActivitySelect = (activity: typeof commonActivities[0]) => {
    setFormData(prev => {
      const duration = parseFloat(prev.duration) || 0;
      const estimatedCalories = duration > 0 ? duration * activity.caloriesPerMinute : '';
      
      return {
        ...prev,
        activity: activity.name,
        caloriesBurned: estimatedCalories.toString(),
      };
    });
  };

  const handleDurationChange = (duration: string) => {
    setFormData(prev => {
      const selectedActivity = commonActivities.find(a => a.name === prev.activity);
      const durationNum = parseFloat(duration) || 0;
      const estimatedCalories = selectedActivity && durationNum > 0 
        ? durationNum * selectedActivity.caloriesPerMinute 
        : prev.caloriesBurned;

      return {
        ...prev,
        duration,
        caloriesBurned: typeof estimatedCalories === 'number' ? estimatedCalories.toString() : prev.caloriesBurned,
      };
    });
  };

  const handleQuickDuration = (duration: number) => {
    handleDurationChange(duration.toString());
  };

  return (
    <div className="sport-form">
      <h3>Add Exercise Entry</h3>
      
      <div className="quick-add-section">
        <h4>Common Activities:</h4>
        <div className="quick-add-grid">
          {commonActivities.map((activity, index) => (
            <button
              key={index}
              type="button"
              className="quick-add-btn"
              onClick={() => handleActivitySelect(activity)}
            >
              {activity.name}
            </button>
          ))}
        </div>
      </div>

      <div className="quick-add-section">
        <h4>Quick Duration (minutes):</h4>
        <div className="quick-add-grid">
          {commonDurations.map((duration) => (
            <button
              key={duration}
              type="button"
              className="quick-add-btn"
              onClick={() => handleQuickDuration(duration)}
            >
              {duration}min
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="sport-entry-form">
        <div className="form-group">
          <label htmlFor="activity-name">Activity Name *</label>
          <input
            id="activity-name"
            type="text"
            value={formData.activity}
            onChange={(e) => setFormData(prev => ({ ...prev, activity: e.target.value }))}
            placeholder="Enter activity name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (minutes) *</label>
          <input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => handleDurationChange(e.target.value)}
            placeholder="0"
            min="1"
            step="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="calories-burned">Calories Burned</label>
          <input
            id="calories-burned"
            type="number"
            value={formData.caloriesBurned}
            onChange={(e) => setFormData(prev => ({ ...prev, caloriesBurned: e.target.value }))}
            placeholder="0"
            min="0"
            step="0.1"
          />
          <small>Leave empty for auto-calculation if using common activities</small>
        </div>

        <button type="submit" className="submit-btn">Add Exercise Entry</button>
      </form>
    </div>
  );
} 