import TicketCard from './TicketCard';

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

interface TicketListProps {
  tickets: Ticket[];
  type: 'active' | 'upcoming';
  title: string;
  emptyIcon: string;
  emptyMessage: string;
}

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  type,
  title,
  emptyIcon,
  emptyMessage
}) => {
  return (
    <section className={type === 'active' ? 'ticket-section' : 'trips-section'}>
      <h2 className="section-title">{title}</h2>
      
      {tickets.length === 0 ? (
        <div className="info-card empty">
          <span className="icon">{emptyIcon}</span>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="tickets-list">
          {tickets.map((ticket) => (
            <TicketCard 
              key={ticket.orderId} 
              ticket={ticket} 
              type={type}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TicketList;
