import { useState } from 'react';
import { useHealth } from '../contexts/HealthContext';

interface FoodFormProps {
  onSubmit?: () => void;
}

export default function FoodForm({ onSubmit }: FoodFormProps) {
  const { addFood } = useHealth();
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const commonFoods = [
    { name: 'Oatmeal with Chia Seeds', calories: 300, protein: 12, carbs: 55, fats: 8 },
    { name: 'Grilled Chicken Salad', calories: 450, protein: 35, carbs: 20, fats: 25 },
    { name: 'Protein Shake', calories: 200, protein: 25, carbs: 10, fats: 5 },
    { name: 'Greek Yogurt with Berries', calories: 180, protein: 15, carbs: 25, fats: 3 },
    { name: 'Banana', calories: 105, protein: 1, carbs: 27, fats: 0 },
    { name: 'Apple', calories: 80, protein: 0, carbs: 21, fats: 0 },
    { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fats: 4 },
    { name: 'Brown Rice (1 cup)', calories: 220, protein: 5, carbs: 45, fats: 2 },
    { name: 'Almonds (30g)', calories: 170, protein: 6, carbs: 6, fats: 15 },
    { name: 'Whole Wheat Bread (1 slice)', calories: 80, protein: 4, carbs: 14, fats: 1 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.calories) {
      alert('Please fill in at least the food name and calories');
      return;
    }

    addFood({
      name: formData.name,
      calories: parseFloat(formData.calories) || 0,
      protein: parseFloat(formData.protein) || 0,
      carbs: parseFloat(formData.carbs) || 0,
      fats: parseFloat(formData.fats) || 0,
    });

    setFormData({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
    });

    onSubmit?.();
  };

  const handleQuickAdd = (food: typeof commonFoods[0]) => {
    setFormData({
      name: food.name,
      calories: food.calories.toString(),
      protein: food.protein.toString(),
      carbs: food.carbs.toString(),
      fats: food.fats.toString(),
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="food-form">
      <h3>Add Food Entry</h3>
      
      <div className="quick-add-section">
        <h4>Quick Add Common Foods:</h4>
        <div className="quick-add-grid">
          {commonFoods.map((food, index) => (
            <button
              key={index}
              type="button"
              className="quick-add-btn"
              onClick={() => handleQuickAdd(food)}
            >
              {food.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="food-entry-form">
        <div className="form-group">
          <label htmlFor="food-name">Food Name *</label>
          <input
            id="food-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter food name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="calories">Calories *</label>
          <input
            id="calories"
            type="number"
            value={formData.calories}
            onChange={(e) => handleInputChange('calories', e.target.value)}
            placeholder="0"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="macros-row">
          <div className="form-group">
            <label htmlFor="protein">Protein (g)</label>
            <input
              id="protein"
              type="number"
              value={formData.protein}
              onChange={(e) => handleInputChange('protein', e.target.value)}
              placeholder="0"
              min="0"
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="carbs">Carbs (g)</label>
            <input
              id="carbs"
              type="number"
              value={formData.carbs}
              onChange={(e) => handleInputChange('carbs', e.target.value)}
              placeholder="0"
              min="0"
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fats">Fats (g)</label>
            <input
              id="fats"
              type="number"
              value={formData.fats}
              onChange={(e) => handleInputChange('fats', e.target.value)}
              placeholder="0"
              min="0"
              step="0.1"
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">Add Food Entry</button>
      </form>
    </div>
  );
} 