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