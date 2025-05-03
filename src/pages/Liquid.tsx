import Navbar from "../components/Navbar";
import LiquidForm from "../components/LiquidForm";
import LiquidEntryList from "../components/LiquidEntryList";
import "../css/liquid.css";

export default function Liquid() {
  return (
    <>
      <Navbar />
      <div className="liquid-page">
        <div className="form-section">
          <LiquidForm />
        </div>
        <div className="entries-section">
          <LiquidEntryList />
        </div>
      </div>
    </>
  );
} 