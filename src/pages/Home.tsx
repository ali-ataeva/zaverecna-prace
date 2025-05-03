import "../css/home.css"
import Navbar from "../components/Navbar"
import FoodSummaryCard from "../components/FoodSummaryCard"
import LiquidSummaryCard from "../components/LiquidSummaryCard"
import SportSummaryCard from "../components/SportSummaryCard"
import RecommendedMealsCard from "../components/RecommendedMealsCard"

export default function Home() {
  return (
    <>
    {/*<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"> */}  
    
    <Navbar/>

    <main>
        <FoodSummaryCard />
        <RecommendedMealsCard />
        <LiquidSummaryCard />
        <SportSummaryCard />
    </main>
    </>

  )
}
