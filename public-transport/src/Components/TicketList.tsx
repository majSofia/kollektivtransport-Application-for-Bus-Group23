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
