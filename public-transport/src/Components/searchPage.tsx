import { useState } from 'react';
import { type Route, getRoutesBetween, filterRoutesByTime } from './routesMocData';
import Layout from './Layout';
import SearchForm from './SearchForm';
import PassengerSelector, { type Passenger } from './PassengerSelect';
import SearchResults from './SearchResualt';

interface SearchPageProps {
  userName: string;
  onLogout: () => void;
  onNavigateToHome: () => void;
  onNavigateToPurchase: (bookingData: any) => void;
  initialFrom?: string;
  initialTo?: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ 
  userName, 
  onLogout, 
  onNavigateToHome,
  onNavigateToPurchase,
  initialFrom = '',
  initialTo = ''
}) => {
  const [showPassengerDropdown, setShowPassengerDropdown] = useState<boolean>(false);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [searchResults, setSearchResults] = useState<Route[]>([]);
  const [searchData, setSearchData] = useState({ from: '', to: '', date: '', time: '' });

  const handleSearch = (data: { from: string; to: string; date: string; time: string }) => {
    setSearchData(data);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(data.date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return;
    }

    const availableRoutes = getRoutesBetween(data.from, data.to);

    if (availableRoutes.length === 0) {
      alert('Beklager, det finnes ingen ruter mellom disse byene ennÃ¥.');
      return;
    }

    const filteredRoutes = filterRoutesByTime(availableRoutes, data.time);

    setSearchResults(filteredRoutes);

    if (filteredRoutes.length === 0) {
      alert('No departures found after the selected time. Try an earlier time. .');
    }
  };

  const handleConfirmPassengers = (confirmedPassengers: Passenger[]) => {
    setPassengers(confirmedPassengers);
    setShowPassengerDropdown(false);
  };

  const handleBuyTicket = (route: Route) => {
    const baseAmount = 150;
    let totalPrice = 0;
    
    passengers.forEach(passenger => {
      if (passenger.type === 'student') {
        totalPrice += baseAmount * 0.7;
      } else {
        totalPrice += baseAmount;
      }
    });

    const bookingData = {
      from: searchData.from,
      to: searchData.to,
      date: searchData.date,
      departureTime: route.departureTime,
      arrivalTime: route.arrivalTime,
      duration: route.duration,
      busNumber: route.busNumber,
      stops: route.stops,
      baseAmount: baseAmount,
      numberOfPassengers: passengers.length,
      totalPrice: totalPrice,
      passengers: passengers
    };

    onNavigateToPurchase(bookingData);
  };

  return (
    <Layout 
      userName={userName} 
      onLogout={onLogout}
      onNavigateToHome={onNavigateToHome}
    >
      <h1 className="page-title">Search Travel</h1>

      <SearchForm
        initialFrom={initialFrom}
        initialTo={initialTo}
        onSearch={handleSearch}
        passengers={passengers.length}
        onOpenPassengerSelector={() => setShowPassengerDropdown(true)}
      />

      <PassengerSelector
        isOpen={showPassengerDropdown}
        onClose={() => setShowPassengerDropdown(false)}
        onConfirm={handleConfirmPassengers}
        initialPassengers={passengers}
      />

      <SearchResults
        results={searchResults}
        fromLocation={searchData.from}
        toLocation={searchData.to}
        date={searchData.date}
        passengers={passengers}
        onBuyTicket={handleBuyTicket}
      />
    </Layout>
  );
};

export default SearchPage;