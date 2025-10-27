import { useState } from 'react';

interface QuickSearchFormProps {
  onSearch: (from: string, to: string) => void;
}

const QuickSearchForm: React.FC<QuickSearchFormProps> = ({ onSearch }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const locations = ['Halden', 'Sarpsborg', 'Fredrikstad'];
  const availableDestinations = locations.filter(loc => loc !== fromLocation);

  const handleSearch = () => {
    if (!fromLocation || !toLocation) {
      alert('Vennligst velg både fra og til lokasjon');
      return;
    }
    onSearch(fromLocation, toLocation);
  };

  const handleFromChange = (value: string) => {
    setFromLocation(value);
    setToLocation(''); // Reset destination when origin changes
  };
  return (
    <section className="search-section">
      <h2 className="section-title">Plan your trip</h2>

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
                <option key={location} value={location}>
                  {location}
                </option>
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
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleSearch} className="btn btn-search">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickSearchForm;