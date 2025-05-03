import Navbar from "../components/Navbar";
import FoodForm from "../components/FoodForm";
import FoodEntryList from "../components/FoodEntryList";
import "../css/food.css";

export default function Food() {
  return (
    <>
      <Navbar />
      <main className="food-page">
        <div className="form-section">
          <FoodForm />
        </div>
        <div className="entries-section">
          <FoodEntryList />
        </div>
      </main>
    </>
  );
}
