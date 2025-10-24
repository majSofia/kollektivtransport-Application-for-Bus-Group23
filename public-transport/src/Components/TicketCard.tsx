//Her lagt vi et interface som heter Ticket.
//Det forklarer hvordan en billett ser ut og hvilke data den skal ha.
//Dette hjelper oss å holde oversikt over all informasjon som knyttet til en billett.
interface Ticket {
  orderId: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  passengers: Array<{ id: number; type: 'student' | 'adult' }>;
  totalPrice: number;
}
//Vi har lagt en interface som bestemme hvilken data skal få som props, 
//så det er to altrnative en for active billetten, og den andre for upcoming billetten.
interface TicketCardProps {
  ticket: Ticket;
  type: 'active' | 'upcoming';
}

//Vi har tenkt å bruke flere variablene, fordi vi tenkte å gjør koden enklere
//og gi oss letter tilgang om vi har lyst til å utvide våres projekt i frimtiden,
//uten og endre reste av koden.TickeCard variable som gi oss info om billetten 
//med props Billet og type som viser oss hav er billettene situasjonen (aktiv eller kommende)
//ikon variabel fint å ha, til at vi kan vise ikon bassert på billtten
const TicketCard: React.FC<TicketCardProps> = ({ ticket, type }) => {
  const isUpcoming = type === 'upcoming';
  const icon = isUpcoming ? '🚌' : '🎫';
  const label = isUpcoming ? 'Travel' : 'Ticket';
  const status = isUpcoming ? 'Upcoming' : 'Active';

  return (
    <div className={`ticket-card ${isUpcoming ? 'upcoming' : ''}`}>
      <div className={`ticket-header ${isUpcoming ? 'upcoming-header' : ''}`}>
        <h3>
          {icon} {label} #{ticket.orderId.slice(-6)}
        </h3>
        <span className="ticket-status">{status}</span>
      </div>
     
      <div className="ticket-body">
        <div className="ticket-route">
          <div className="ticket-location">
            <span className="ticket-label">From</span>
            <span className="ticket-value">{ticket.from}</span>
            <span className="ticket-time">{ticket.departureTime}</span>
          </div>
          
          <div className="ticket-arrow">→</div>
          
          <div className="ticket-location">
            <span className="ticket-label">To</span>
            <span className="ticket-value">{ticket.to}</span>
            <span className="ticket-time">{ticket.arrivalTime}</span>
          </div>
        </div>
        {/*Vi hentet emojis fra: https://www.w3schools.com/html/html_emojis.asp*/ }
        <div className="ticket-details">
          <div className="ticket-detail-item">
            <span>📅 Date:</span>
            <span>{ticket.date}</span>
          </div>
          <div className="ticket-detail-item">
            <span>👥 Passengers:</span>
            <span>{ticket.passengers.length}</span>
          </div>
          <div className="ticket-detail-item">
            <span>💰 Price:</span>
            <span>{ticket.totalPrice.toFixed(2)} kr</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;