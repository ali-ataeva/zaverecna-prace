import "../css/home.css"
import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <>
    {/*<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"> */}  
    
    <Navbar/>

    <main>
        <article className="food">
            <h2>Today's Intake</h2>
            <p>Total Calories: <span id="totalCalories">0</span> kcal</p>
            <div className="macros">
                <p>Protein: <span id="totalProtein">0</span> g</p>
                <p>Carbs: <span id="totalCarbs">0</span> g</p>
                <p>Fats: <span id="totalFats">0</span> g</p>
            </div>
            <a href="food.html" className="button">+</a>
        </article>

        <article className="recommendedMeals">
            <h2>Recommended Meals</h2>
            <ul>
                <li>Oatmeal with Chia Seeds - 300 kcal</li>
                <li>Grilled Chicken Salad - 450 kcal</li>
                <li>Protein Shake - 200 kcal</li>
            </ul>
        </article>
    
        <article className="liquid">
            <h2>Liquid Intake Tracker</h2>
            <ul>
                <li>Water: <span id="totalWater">0</span> l</li>
                <li>Soft drinks: <span id="totalSoftDrinks">0</span> l</li>
                <li>Juice drinks: <span id="totalJuice">0</span> l</li>
                <li>Milk: <span id="totalMilk">0</span> l</li>
                <li>Spirits: <span id="totalWater">0</span> l</li>
            </ul>
            <a href="liquid.html" className="button">+</a>
        </article>
    
        <article className="sport">
            <h2>Sport Activity Tracking</h2>
            <ul>
                <li>Total Burned: <span id="totalBurned">0</span> kcal</li>
                <li>Total Exercise time: <span id="totalBurned">0</span> min</li>
            </ul>
            <a href="sport.html" className="button">+</a>
        </article>
    </main>
    </>

  )
}
