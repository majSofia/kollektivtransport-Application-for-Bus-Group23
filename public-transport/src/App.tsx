import { useState, useEffect } from 'react';
import Login from './Components/logInPage';
import CreateNewUser from './Components/userPage';
import HomePage from './Components/homePage';
import SearchPage from './Components/searchPage';
import PurchaseSummaryPage from './Components/purchaseSummary';
import './App.css';
import { getCurrentUser, logoutUser } from './Components/virtualDataBase';

type Page = 'login' | 'create' | 'home' | 'search' | 'purchase';

interface Ticket {
  orderId: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  passengers: Array<{ id: number; type: 'student' | 'adult' }>;
  totalPrice: number;
  orderDate: string;
}

interface SearchParams {
  from: string;
  to: string;
}

const TICKETS_STORAGE_KEY = 'kudo_active_tickets';
const UPCOMING_STORAGE_KEY = 'kudo_upcoming_trips';
const CURRENT_PAGE_KEY = 'kudo_current_page';
const SEARCH_PARAMS_KEY = 'kudo_search_params';
const BOOKING_DATA_KEY = 'kudo_booking_data';
const ORDER_CONFIRMED_KEY = 'kudo_order_confirmed';
const CONFIRMATION_TIMESTAMP_KEY = 'kudo_confirmation_timestamp';
const ORDER_SAVED_KEY = 'kudo_order_saved';

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [currentUser, setCurrentUser] = useState<string>('');
  const [bookingData, setBookingData] = useState<any>(null);
  const [activeTickets, setActiveTickets] = useState<Ticket[]>([]);
  const [upcomingTrips, setUpcomingTrips] = useState<Ticket[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({ from: '', to: '' });

  // Sjekk om bruker er innlogget ved oppstart/refresh
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user.fullName);
      
      // Last inn siste side brukeren var på
      const savedPage = localStorage.getItem(CURRENT_PAGE_KEY) as Page;
      if (savedPage && savedPage !== 'login' && savedPage !== 'create') {
        setCurrentPage(savedPage);
      } else {
        setCurrentPage('home');
      }

      // Last inn search params hvis de finnes
      const savedSearchParams = localStorage.getItem(SEARCH_PARAMS_KEY);
      if (savedSearchParams) {
        setSearchParams(JSON.parse(savedSearchParams));
      }

      // Last inn booking data hvis de finnes
      const savedBookingData = localStorage.getItem(BOOKING_DATA_KEY);
      if (savedBookingData) {
        setBookingData(JSON.parse(savedBookingData));
      }
      
      // Last inn billetter fra localStorage
      const storedActiveTickets = localStorage.getItem(TICKETS_STORAGE_KEY);
      const storedUpcomingTrips = localStorage.getItem(UPCOMING_STORAGE_KEY);
      
      if (storedActiveTickets) {
        setActiveTickets(JSON.parse(storedActiveTickets));
      }
      
      if (storedUpcomingTrips) {
        setUpcomingTrips(JSON.parse(storedUpcomingTrips));
      }
    } else {
      // Hvis ingen bruker er innlogget, fjern saved page
      localStorage.removeItem(CURRENT_PAGE_KEY);
      localStorage.removeItem(SEARCH_PARAMS_KEY);
      localStorage.removeItem(BOOKING_DATA_KEY);
      localStorage.removeItem(ORDER_CONFIRMED_KEY);
      localStorage.removeItem(CONFIRMATION_TIMESTAMP_KEY);
      localStorage.removeItem(ORDER_SAVED_KEY);
    }
  }, []);

  // Lagre currentPage til localStorage når den endres
  useEffect(() => {
    if (currentUser && currentPage !== 'login' && currentPage !== 'create') {
      localStorage.setItem(CURRENT_PAGE_KEY, currentPage);
    }
  }, [currentPage, currentUser]);

  // Lagre booking data til localStorage når den endres
  useEffect(() => {
    if (currentUser && bookingData) {
      localStorage.setItem(BOOKING_DATA_KEY, JSON.stringify(bookingData));
    }
  }, [bookingData, currentUser]);

  // Lagre billetter til localStorage når de endres
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(activeTickets));
    }
  }, [activeTickets, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(UPCOMING_STORAGE_KEY, JSON.stringify(upcomingTrips));
    }
  }, [upcomingTrips, currentUser]);

  // Lagre search params til localStorage
  useEffect(() => {
    if (currentUser && (searchParams.from || searchParams.to)) {
      localStorage.setItem(SEARCH_PARAMS_KEY, JSON.stringify(searchParams));
    }
  }, [searchParams, currentUser]);

  const handleLoginSuccess = (userName: string) => {
    setCurrentUser(userName);
    setCurrentPage('home');
    localStorage.setItem(CURRENT_PAGE_KEY, 'home');
    
    // Last inn billetter for denne brukeren
    const storedActiveTickets = localStorage.getItem(TICKETS_STORAGE_KEY);
    const storedUpcomingTrips = localStorage.getItem(UPCOMING_STORAGE_KEY);
    
    if (storedActiveTickets) {
      setActiveTickets(JSON.parse(storedActiveTickets));
    }
    
    if (storedUpcomingTrips) {
      setUpcomingTrips(JSON.parse(storedUpcomingTrips));
    }
  };

  const handleRegisterSuccess = (userName: string) => {
    setCurrentUser(userName);
    setCurrentPage('home');
    localStorage.setItem(CURRENT_PAGE_KEY, 'home');
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser('');
    setCurrentPage('login');
    setActiveTickets([]);
    setUpcomingTrips([]);
    setBookingData(null);
    
    // Fjern alle data fra localStorage
    localStorage.removeItem(TICKETS_STORAGE_KEY);
    localStorage.removeItem(UPCOMING_STORAGE_KEY);
    localStorage.removeItem(CURRENT_PAGE_KEY);
    localStorage.removeItem(SEARCH_PARAMS_KEY);
    localStorage.removeItem(BOOKING_DATA_KEY);
    localStorage.removeItem(ORDER_CONFIRMED_KEY);
    localStorage.removeItem(CONFIRMATION_TIMESTAMP_KEY);
    localStorage.removeItem(ORDER_SAVED_KEY);
  };

  const handleNavigateToSearch = (from?: string, to?: string) => {
    if (from && to) {
      setSearchParams({ from, to });
    } else {
      setSearchParams({ from: '', to: '' });
    }
    setCurrentPage('search');
  };

  const handleNavigateToPurchase = (data: any) => {
    setBookingData(data);
    setCurrentPage('purchase');
  };

  const handleNavigateToHome = () => {
    // Fjern booking data og confirmation når vi går til home
    setBookingData(null);
    localStorage.removeItem(BOOKING_DATA_KEY);
    localStorage.removeItem(ORDER_CONFIRMED_KEY);
    localStorage.removeItem(CONFIRMATION_TIMESTAMP_KEY);
    localStorage.removeItem(ORDER_SAVED_KEY);
    setCurrentPage('home');
  };

  const handleConfirmOrder = (orderData: Ticket) => {
    console.log('📥 Received order in App.tsx:', orderData);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
   
    const ticketDate = new Date(orderData.date);
    ticketDate.setHours(0, 0, 0, 0);
    
    if (ticketDate.getTime() === today.getTime()) {
      setActiveTickets([...activeTickets, orderData]);
    } else if (ticketDate.getTime() > today.getTime()) {
      setUpcomingTrips([...upcomingTrips, orderData]);
    } else {
      setActiveTickets([...activeTickets, orderData]);
    }

    // VIKTIG: IKKE fjern BOOKING_DATA_KEY her, den trengs for refresh
    // Fjern bare når vi går til home
  };

  if(currentPage === 'login') {
    return(
      <Login
        onCreateAccount={() => setCurrentPage('create')}
        onLoginSuccess={handleLoginSuccess}
      />
    )
  }
     
  if(currentPage === 'create'){
    return(
      <CreateNewUser
        onBackToLogin={() => setCurrentPage('login')}
        onRegisterSuccess={handleRegisterSuccess}
      />
    )
  }  

  return (
    <div className="app">
      {currentPage === 'home' && (
        <HomePage
          userName={currentUser}
          onLogout={handleLogout}
          onNavigateToSearch={handleNavigateToSearch}
          activeTickets={activeTickets}
          upcomingTrips={upcomingTrips}
        />
      )}
     
      {currentPage === 'search' && (
        <SearchPage
          userName={currentUser}
          onLogout={handleLogout}
          onNavigateToHome={handleNavigateToHome}
          onNavigateToPurchase={handleNavigateToPurchase}
          initialFrom={searchParams.from}
          initialTo={searchParams.to}
        />
      )}
      
      {currentPage === 'purchase' && bookingData && (
        <PurchaseSummaryPage
          userName={currentUser}
          onLogout={handleLogout}
          onNavigateToHome={handleNavigateToHome}
          bookingData={bookingData}
          onConfirmOrder={handleConfirmOrder}
        />
      )}
    </div>
  )
};

export default App;