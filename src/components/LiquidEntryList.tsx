import { useHealth } from '../contexts/HealthContext';
import { LiquidEntry } from '../types';

export default function LiquidEntryList() {
  const { state } = useHealth();
  const { dailyData } = state;

  const liquidTypeLabels: Record<LiquidEntry['type'], string> = {
    'water': 'Water',
    'soft-drinks': 'Soft Drinks',
    'juice': 'Juice',
    'milk': 'Milk',
    'spirits': 'Spirits',
  };

  if (dailyData.liquids.length === 0) {
    return (
      <div className="entry-list liquids">
        <h2>Today's Liquid Intake</h2>
        <p className="no-entries">No liquid entries yet today. Stay hydrated!</p>
      </div>
    );
  }

  // Group liquids by type
  const liquidsByType = dailyData.liquids.reduce((acc, liquid) => {
    if (!acc[liquid.type]) {
      acc[liquid.type] = [];
    }
    acc[liquid.type].push(liquid);
    return acc;
  }, {} as Record<LiquidEntry['type'], LiquidEntry[]>);

  return (
    <main className="liquids column-main">
      <h2>Today's Liquid Intake</h2>
      {Object.entries(liquidsByType).map(([type, liquids]) => (
        <section key={type} className="liquid-type">
          <h3>{liquidTypeLabels[type as LiquidEntry['type']]}</h3>
          <ul>
            {liquids.map((liquid) => (
              <li key={liquid.id}>
                {liquid.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })} - {liquidTypeLabels[liquid.type]} ({liquid.amount}ml)
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
} 