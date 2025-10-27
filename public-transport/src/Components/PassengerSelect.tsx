import { useState } from 'react';

export interface Passenger {
  id: number;
  type: 'student' | 'adult';
}

interface PassengerSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (passengers: Passenger[]) => void;
  initialPassengers?: Passenger[];
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialPassengers = []
}) => {
  const [passengers, setPassengers] = useState<Passenger[]>(initialPassengers);

  const addPassenger = () => {
    setPassengers([...passengers, { id: Date.now(), type: 'adult' }]);
  };

  const removePassenger = (id: number) => {
    setPassengers(passengers.filter(p => p.id !== id));
  };

  const changePassengerType = (id: number, type: 'student' | 'adult') => {
    setPassengers(passengers.map(p => 
      p.id === id ? { ...p, type } : p
    ));
  };

  const handleConfirm = () => {
    onConfirm(passengers);
  };

  if (!isOpen) return null;

  return (
    <div className="passenger-dropdown">
      <div className="dropdown-header">
        <h3>Select passengers</h3>
        <button className="close-dropdown" onClick={onClose}>×</button>
      </div>

      <div className="passenger-list">
        {passengers.map((passenger, index) => (
          <div key={passenger.id} className="passenger-item">
            <span className="passenger-number">Passenger {index + 1}</span>
            
            <select
              value={passenger.type}
              onChange={(e) => changePassengerType(passenger.id, e.target.value as 'student' | 'adult')}
              className="passenger-type-select"
            >
              <option value="adult">Adult</option>
              <option value="student">Student</option>
            </select>
            
            <button
              onClick={() => removePassenger(passenger.id)}
              className="remove-passenger"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <button onClick={addPassenger} className="add-passenger-btn">
        + Add passengers
      </button>

      <div className="passenger-total">
        <strong>Total: {passengers.length} passenger(s)</strong>
      </div>

      <button onClick={handleConfirm} className="btn btn-primary">
        Confirm
      </button>
    </div>
  );
};

export default PassengerSelector;