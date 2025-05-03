import { useState } from 'react';
import { useHealth } from '../contexts/HealthContext';
import { LiquidEntry } from '../types';

interface LiquidFormProps {
  onSubmit?: () => void;
}

export default function LiquidForm({ onSubmit }: LiquidFormProps) {
  const { addLiquid } = useHealth();
  const [formData, setFormData] = useState<{
    type: LiquidEntry['type'];
    amount: string;
  }>({
    type: 'water',
    amount: '',
  });

  const liquidTypes = [
    { value: 'water', label: 'Water' },
    { value: 'soft-drinks', label: 'Soft Drinks' },
    { value: 'juice', label: 'Juice' },
    { value: 'milk', label: 'Milk' },
    { value: 'spirits', label: 'Spirits' },
  ] as const;

  const commonAmounts = [100, 200, 250, 330, 500, 750, 1000]; // in ml

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount) {
      alert('Please enter an amount');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    addLiquid({
      type: formData.type,
      amount: amount,
    });

    setFormData({
      type: 'water',
      amount: '',
    });

    onSubmit?.();
  };

  const handleQuickAdd = (amount: number) => {
    setFormData(prev => ({ ...prev, amount: amount.toString() }));
  };

  return (
    <div className="liquid-form">
      <h3>Add Liquid Entry</h3>
      
      <div className="quick-add-section">
        <h4>Quick Add Amounts (ml):</h4>
        <div className="quick-add-grid">
          {commonAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              className="quick-add-btn"
              onClick={() => handleQuickAdd(amount)}
            >
              {amount}ml
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="liquid-entry-form">
        <div className="form-group">
          <label htmlFor="liquid-type">Liquid Type</label>
          <select
            id="liquid-type"
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              type: e.target.value as LiquidEntry['type']
            }))}
          >
            {liquidTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="liquid-amount">Amount (ml) *</label>
          <input
            id="liquid-amount"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              amount: e.target.value 
            }))}
            placeholder="0"
            min="1"
            step="1"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Liquid Entry</button>
      </form>
    </div>
  );
} 