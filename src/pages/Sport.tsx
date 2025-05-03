import Navbar from "../components/Navbar";
import SportForm from "../components/SportForm";
import SportEntryList from "../components/SportEntryList";
import "../css/sport.css";

export default function Sport() {
  return (
    <>
      <Navbar />
      <main className="sport-page">
        <div className="form-section">
          <SportForm />
        </div>
        <div className="entries-section">
          <SportEntryList />
        </div>
      </main>
    </>
  );
} 