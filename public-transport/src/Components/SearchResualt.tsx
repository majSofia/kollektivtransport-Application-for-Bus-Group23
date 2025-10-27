import { useState } from 'react';
import { type Route } from './routesMocData';
import { type Passenger } from './PassengerSelect';

interface SearchResultsProps {
  results: Route[];
  fromLocation: string;
  toLocation: string;
  date: string;
  passengers: Passenger[];
  onBuyTicket: (route: Route) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  fromLocation,
  toLocation,
  date,
  passengers,
  onBuyTicket
}) => {
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);

  const calculateTotalPrice = () => {
    const baseAmount = 150;
    return passengers.reduce((total, passenger) => {
      return total + (passenger.type === 'student' ? baseAmount * 0.7 : baseAmount);
    }, 0);
  };

  const toggleRoute = (routeId: string) => {
    setExpandedRouteId(expandedRouteId === routeId ? null : routeId);
  };

  if (results.length === 0) return null;

  const totalPrice = calculateTotalPrice();

  return (
    <div className="results-section">
      <h2 className="section-title">
        {results.length} available departure{results.length > 1 ? 's' : ''}
      </h2>
      
      {results.map((route) => (
        <div key={route.id} className="result-card">
          <div className="trip-info">
            <div className="trip-route">
              <div className="trip-station">
                <span className="station-name">{fromLocation}</span>
                <span className="trip-time">{route.departureTime}</span>
              </div>

              <div className="trip-arrow">
                <span className="duration">{route.duration}</span>
                <span className="arrow-line">→</span>
              </div>

              <div className="trip-station">
                <span className="station-name">{toLocation}</span>
                <span className="trip-time">{route.arrivalTime}</span>
              </div>
            </div>

            <div className="trip-details">
              <span className="detail-item">📅 {date}</span>
              <span className="detail-item">🚌 {route.busNumber}</span>
              <span className="detail-item">🛑 {route.stops.length} stops</span>
            </div>

            <div className="stops-list">
              <button 
                className="stops-toggle-btn"
                onClick={() => toggleRoute(route.id)}
              >
                <strong>Stops: {route.stops.length}</strong>
                <span className="toggle-icon">
                  {expandedRouteId === route.id ? '▲' : '▼'}
                </span>
              </button>
              
              {expandedRouteId === route.id && (
                <div className="stops-container">
                  {route.stops.map((stop, index) => (
                    <span key={index} className="stop-badge">{stop}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="price-info">
            <div className="price-breakdown">
              <div className="price-row">
                <span>Baseprice:</span>
                <span>150 kr</span>
              </div>
              <div className="price-row">
                <span>Number of passengers:</span>
                <span>{passengers.length}</span>
              </div>
              <div className="price-row total">
                <span>Total:</span>
                <span>{totalPrice.toFixed(2)} kr</span>
              </div>
            </div>
            <button 
              className="btn-buy"
              onClick={() => onBuyTicket(route)}
            >
              Buy ticket
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;