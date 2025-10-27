import { useState, useEffect } from 'react';

interface SearchFormProps {
  initialFrom?: string;
  initialTo?: string;
  onSearch: (searchData: {
    from: string;
    to: string;
    date: string;
    time: string;
  }) => void;
  passengers: number;
  onOpenPassengerSelector: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  initialFrom = '',
  initialTo = '',
  onSearch,
  passengers,
  onOpenPassengerSelector
}) => {
  const [fromLocation, setFromLocation] = useState(initialFrom);
  const [toLocation, setToLocation] = useState(initialTo);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dateError, setDateError] = useState('');

  const locations = ['Halden', 'Sarpsborg', 'Fredrikstad'];
  const timeOptions = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  useEffect(() => {
    setFromLocation(initialFrom);
    setToLocation(initialTo);
  }, [initialFrom, initialTo]);

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const isDateInPast = (selectedDate: string) => {
    return new Date(selectedDate) < new Date(getTodayDate());
  };

  const availableDestinations = locations.filter(loc => loc !== fromLocation);

  const handleDateChange = (selectedDate: string) => {
    if (isDateInPast(selectedDate)) {
      setDateError('Du kan ikke velge en dato som allerede har utløpt.');
      setDate('');
      setTime('');
    } else {
      setDateError('');
      setDate(selectedDate);
      setTime('');
    }
  };

  const handleFromChange = (value: string) => {
    setFromLocation(value);
    setToLocation('');
  };

  const handleSearch = () => {
    if (!fromLocation || !toLocation || !date || !time) {
      alert('Vennligst fyll ut alle feltene');
      return;
    }

    if (passengers === 0) {
      alert('Vennligst legg til minst én passasjer');
      return;
    }

    onSearch({ from: fromLocation, to: toLocation, date, time });
  };

  return (
    <div className="search-card">
      <div className="search-form">
        <div className="form-field">
          <label htmlFor="from">From</label>
          <select
            id="from"
            value={fromLocation}
            onChange={(e) => handleFromChange(e.target.value)}
            className="location-select"
          >
            <option value="">Select departure point</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="to">To</label>
          <select
            id="to"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            className="location-select"
            disabled={!fromLocation}
          >
            <option value="">Choose destination</option>
            {availableDestinations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              min={getTodayDate()}
              onChange={(e) => handleDateChange(e.target.value)}
              className="date-input"
            />
            {dateError && <div className="error-message">{dateError}</div>}
          </div>

          <div className="form-field">
            <label htmlFor="time">Time</label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="time-input"
              disabled={!date}
            >
              <option value="">Select time</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-field">
          <label>Number of passengers</label>
          <div className="passenger-control">
            <button
              className="passenger-btn"
              onClick={onOpenPassengerSelector}
              disabled={passengers === 0}
            >
              -
            </button>
            <span className="passenger-count">{passengers}</span>
            <button
              className="passenger-btn"
              onClick={onOpenPassengerSelector}
            >
              +
            </button>
          </div>
        </div>

        <button 
          onClick={handleSearch} 
          className="btn btn-search"
          disabled={!date || !time}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchForm;