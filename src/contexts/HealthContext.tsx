import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { DailyData, FoodEntry, LiquidEntry, SportEntry, Totals } from '../types';

interface HealthState {
  dailyData: DailyData;
  totals: Totals;
}

type HealthAction =
  | { type: 'ADD_FOOD'; payload: FoodEntry }
  | { type: 'ADD_LIQUID'; payload: LiquidEntry }
  | { type: 'ADD_SPORT'; payload: SportEntry }
  | { type: 'LOAD_DATA'; payload: DailyData }
  | { type: 'RESET_DAILY_DATA' };

interface HealthContextType {
  state: HealthState;
  addFood: (food: Omit<FoodEntry, 'id' | 'timestamp'>) => void;
  addLiquid: (liquid: Omit<LiquidEntry, 'id' | 'timestamp'>) => void;
  addSport: (sport: Omit<SportEntry, 'id' | 'timestamp'>) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

const getTodayString = () => new Date().toISOString().split('T')[0];

const calculateTotals = (dailyData: DailyData): Totals => {
  const foodTotals = dailyData.foods.reduce(
    (acc, food) => ({
      calories: acc.calories + food.calories,
      protein: acc.protein + food.protein,
      carbs: acc.carbs + food.carbs,
      fats: acc.fats + food.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const liquidTotals = dailyData.liquids.reduce(
    (acc, liquid) => {
      const key = liquid.type === 'soft-drinks' ? 'softDrinks' : liquid.type;
      return {
        ...acc,
        [key]: acc[key] + liquid.amount / 1000, // Convert ml to liters
      };
    },
    { water: 0, softDrinks: 0, juice: 0, milk: 0, spirits: 0 }
  );

  const sportTotals = dailyData.sports.reduce(
    (acc, sport) => ({
      caloriesBurned: acc.caloriesBurned + sport.caloriesBurned,
      exerciseTime: acc.exerciseTime + sport.duration,
    }),
    { caloriesBurned: 0, exerciseTime: 0 }
  );

  return {
    ...foodTotals,
    liquids: liquidTotals,
    sport: sportTotals,
  };
};

const initialDailyData: DailyData = {
  date: getTodayString(),
  foods: [],
  liquids: [],
  sports: [],
};

const initialState: HealthState = {
  dailyData: initialDailyData,
  totals: calculateTotals(initialDailyData),
};

function healthReducer(state: HealthState, action: HealthAction): HealthState {
  switch (action.type) {
    case 'ADD_FOOD': {
      const newDailyData = {
        ...state.dailyData,
        foods: [...state.dailyData.foods, action.payload],
      };
      return {
        dailyData: newDailyData,
        totals: calculateTotals(newDailyData),
      };
    }
    case 'ADD_LIQUID': {
      const newDailyData = {
        ...state.dailyData,
        liquids: [...state.dailyData.liquids, action.payload],
      };
      return {
        dailyData: newDailyData,
        totals: calculateTotals(newDailyData),
      };
    }
    case 'ADD_SPORT': {
      const newDailyData = {
        ...state.dailyData,
        sports: [...state.dailyData.sports, action.payload],
      };
      return {
        dailyData: newDailyData,
        totals: calculateTotals(newDailyData),
      };
    }
    case 'LOAD_DATA': {
      return {
        dailyData: action.payload,
        totals: calculateTotals(action.payload),
      };
    }
    case 'RESET_DAILY_DATA': {
      const newDailyData = {
        date: getTodayString(),
        foods: [],
        liquids: [],
        sports: [],
      };
      return {
        dailyData: newDailyData,
        totals: calculateTotals(newDailyData),
      };
    }
    default:
      return state;
  }
}

export function HealthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(healthReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('healthTrackerData');
    if (savedData) {
      try {
        const parsedData: DailyData = JSON.parse(savedData);
        const today = getTodayString();
        
        // Check if saved data is from today
        if (parsedData.date === today) {
          // Convert timestamp strings back to Date objects
          const dataWithDates = {
            ...parsedData,
            foods: parsedData.foods.map(food => ({
              ...food,
              timestamp: new Date(food.timestamp),
            })),
            liquids: parsedData.liquids.map(liquid => ({
              ...liquid,
              timestamp: new Date(liquid.timestamp),
            })),
            sports: parsedData.sports.map(sport => ({
              ...sport,
              timestamp: new Date(sport.timestamp),
            })),
          };
          dispatch({ type: 'LOAD_DATA', payload: dataWithDates });
        } else {
          // Data is old, reset to new day
          dispatch({ type: 'RESET_DAILY_DATA' });
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
        dispatch({ type: 'RESET_DAILY_DATA' });
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('healthTrackerData', JSON.stringify(state.dailyData));
  }, [state.dailyData]);

  const addFood = (food: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    const newFood: FoodEntry = {
      ...food,
      id: generateId(),
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_FOOD', payload: newFood });
  };

  const addLiquid = (liquid: Omit<LiquidEntry, 'id' | 'timestamp'>) => {
    const newLiquid: LiquidEntry = {
      ...liquid,
      id: generateId(),
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_LIQUID', payload: newLiquid });
  };

  const addSport = (sport: Omit<SportEntry, 'id' | 'timestamp'>) => {
    const newSport: SportEntry = {
      ...sport,
      id: generateId(),
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_SPORT', payload: newSport });
  };

  return (
    <HealthContext.Provider value={{ state, addFood, addLiquid, addSport }}>
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
} 