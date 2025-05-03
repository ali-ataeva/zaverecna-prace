export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: Date;
}

export interface LiquidEntry {
  id: string;
  type: 'water' | 'soft-drinks' | 'juice' | 'milk' | 'spirits';
  amount: number; // in ml
  timestamp: Date;
}

export interface SportEntry {
  id: string;
  activity: string;
  duration: number; // in minutes
  caloriesBurned: number;
  timestamp: Date;
}

export interface DailyData {
  date: string; // YYYY-MM-DD format
  foods: FoodEntry[];
  liquids: LiquidEntry[];
  sports: SportEntry[];
}

export interface Totals {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  liquids: {
    water: number;
    softDrinks: number;
    juice: number;
    milk: number;
    spirits: number;
  };
  sport: {
    caloriesBurned: number;
    exerciseTime: number;
  };
} 