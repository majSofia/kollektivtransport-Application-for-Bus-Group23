interface ConfirmationMessageProps {
  // Ingen props nødvendig for nå, men kan legges til senere
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = () => {
  return (
    <div className="confirmation-message">
      <div className="confirmation-icon">✅</div>
      <h1>THANK YOU FOR YOUR ORDER!</h1>
      <p>Your ticket is confirmed.</p>
      <p className="redirect-message">
        You will be automatically sent to the homepage...
      </p>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default ConfirmationMessage;