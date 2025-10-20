//React biblioteket
//useState: for å lagre data som kan enderes
import React, {useState} from "react";

//Dette er et objekt interface for ticket som viser hvordan et billett skl seut.
//Vi definerer hvilke nøkler og verdier billetten skal ha.
interface Ticket {
    orderId: string
    from: string
    to: string
    date: string
    departurerTime: string
    arrivalTime: string
    passengers: Array<{id: number; type: "student" | "adult" }>;
    totalPrice: number;
}
//HomePageProps er et objekt som  forteller om at  hva hjemmesiden trenger for å fungere.
//Den vet hvem brukeren er, lar deg logge ut eller søke etter nye reiser, og viser billetter du har nå og turer som kommer.
interface HomePageProps {
  userName: string;
  onLogout: () => void;
  onNavigateToSearch: () => void;
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

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [fromLocation, setFromLocation] = useState<string>('');
  const [toLocation, setToLocation] = useState<string>('');

  const locations = ['Halden', 'Sarpsborg', 'Fredrikstad'];
  
  const getToLocations = (from: string): string[] => {
    return locations.filter(loc => loc !== from);
  };

  const handleSearch = ()=> {
    if (!fromLocation || !toLocation) {
      alert("Vennligst velg både fra og til lokasjo")
      return;
    }
    console.log('Søker:', { fromLocation, toLocation });
    onNavigateToSearch();
  };
  


}


export default HomePage;
