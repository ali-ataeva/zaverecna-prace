export default function RecommendedMealsCard() {
  const recommendedMeals = [
    { name: 'Oatmeal with Chia Seeds', calories: 300 },
    { name: 'Grilled Chicken Salad', calories: 450 },
    { name: 'Protein Shake', calories: 200 },
    { name: 'Greek Yogurt with Berries', calories: 180 },
    { name: 'Quinoa Bowl with Vegetables', calories: 380 },
    { name: 'Salmon with Sweet Potato', calories: 520 },
  ];

  return (
    <article className="recommendedMeals">
      <h2>Recommended Meals</h2>
      <ul>
        {recommendedMeals.map((meal, index) => (
          <li key={index}>
            {meal.name} - {meal.calories} kcal
          </li>
        ))}
      </ul>
    </article>
  );
} 