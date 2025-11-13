interface OrderSummaryProps {
  bookingData: {
    from: string;
    to: string;
    date: string;
    departureTime: string;
    arrivalTime: string;
    passengers: Array<{ id: number; type: 'student' | 'adult' }>;
    totalPrice: number;
    baseAmount: number;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  bookingData,
  onConfirm,
  onCancel
}) => {
  const countPassengerTypes = () => {
    const adults = bookingData.passengers.filter(p => p.type === 'adult').length;
    const students = bookingData.passengers.filter(p => p.type === 'student').length;
    return { adults, students };
  };

  const { adults, students } = countPassengerTypes();

  return (
    <>
      <h1 className="page-title">Purchase Summary</h1>

      <div className="summary-card">
        <div className="summary-header">
          <h2>Order details</h2>
        </div>

        <div className="summary-content">
          {/* Travel Information */}
          <div className="summary-section">
            <h3>🚍 Travel information</h3>
            <div className="summary-row">
              <span className="summary-label">From:</span>
              <span className="summary-value">{bookingData.from}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">To:</span>
              <span className="summary-value">{bookingData.to}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Date:</span>
              <span className="summary-value">{bookingData.date}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Departure:</span>
              <span className="summary-value">{bookingData.departureTime}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Arrival:</span>
              <span className="summary-value">{bookingData.arrivalTime}</span>
            </div>
          </div>

          <div className="summary-divider"></div>

          {/* Passengers */}
          <div className="summary-section">
            <h3>👥 Passengers</h3>
            <div className="summary-row">
              <span className="summary-label">Number of passengers:</span>
              <span className="summary-value">{bookingData.passengers.length}</span>
            </div>
            {adults > 0 && (
              <div className="summary-row">
                <span className="summary-label">Adult:</span>
                <span className="summary-value">{adults} person(s)</span>
              </div>
            )}
            {students > 0 && (
              <div className="summary-row">
                <span className="summary-label">Student:</span>
                <span className="summary-value">{students} person(s)</span>
              </div>
            )}
          </div>

          <div className="summary-divider"></div>

          {/* Price Details */}
          <div className="summary-section">
            <h3>💰 Price details</h3>
            <div className="summary-row">
              <span className="summary-label">Base price:</span>
              <span className="summary-value">{bookingData.baseAmount} kr</span>
            </div>
            {students > 0 && (
              <div className="summary-row discount-info">
                <span className="summary-label">Student discount:</span>
                <span className="summary-value">30% discount</span>
              </div>
            )}
            <div className="summary-row total-price">
              <span className="summary-label">Total price:</span>
              <span className="summary-value">{bookingData.totalPrice.toFixed(2)} kr</span>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="summary-footer">
          <button 
            onClick={onConfirm} 
            className="btn btn-confirm"
          >
            Confirm order
          </button>
          <button 
            onClick={onCancel} 
            className="btn btn-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;