import '../App.css';
import Layout from './Layout';
import WelcomeBanner from './WelcomeMessage';
import QuickSearchForm from './SearchBox';
import TicketList from './TicketList';

//Dette er et objekt interface for ticket som viser hvordan et billett skl ser ut.
//Vi definerer hvilke nøkler og verdier billetten skal ha..
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

//HomePageProps er et objekt som  forteller om at hva hjemmesiden trenger for å fungere.
//Den vet hvem brukeren er, lar deg logge ut eller søke etter nye reiser,
//og viser billetter du har nå og turer som kommer.
interface HomePageProps {
  userName: string;
  onLogout: () => void;
  onNavigateToSearch: (from?: string, to?: string) => void;
  activeTickets: Ticket[];
  upcomingTrips: Ticket[];
}

const HomePage: React.FC<HomePageProps> = ({
  userName,
  onLogout,
  onNavigateToSearch,
  activeTickets,
  upcomingTrips
}) => {
  return (
    <Layout
      userName={userName}
      onLogout={onLogout}
      onNavigateToSearch={() => onNavigateToSearch()}
    >
      <WelcomeBanner userName={userName} />
      <QuickSearchForm onSearch={onNavigateToSearch} />
      
      <TicketList
        tickets={activeTickets}
        type="active"
        title="Your active ticket"
        emptyIcon="🎫"
        emptyMessage="You have no active tickets."
      />
      
      <TicketList
        tickets={upcomingTrips}
        type="upcoming"
        title="Your upcoming trips"
        emptyIcon="🚌"
        emptyMessage="No planned trips"
      />
    </Layout>
  );
};

export default HomePage;





