import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchPage from '../Components/searchPage';
import { vi, beforeEach, expect, test } from 'vitest';
import * as routesMockData from '../Components/routesMocData';

// Mock alle sub-komponenter på en enklere måte
vi.mock('../Components/layout', () => ({
  default: ({ children, userName }: any) => (
    <div data-testid="layout">
      <div data-testid="username">{userName}</div>
      {children}
    </div>
  ),
}));

vi.mock('../Components/SearchForm', () => ({
  default: ({ onSearch }: any) => (
    <div data-testid="search-form">
      <button 
        data-testid="search-button"
        onClick={() => onSearch({ 
          from: 'Halden', 
          to: 'Sarpsborg', 
          date: '2025-12-01', 
          time: '10:00' 
        })}
      >
        Search
      </button>
    </div>
  ),
}));

vi.mock('../Components/PssengerSelct', () => ({
  default: () => null,
}));

vi.mock('../Components/SearchResualt', () => ({
  default: ({ results, onBuyTicket }: any) => (
    <div data-testid="search-results">
      <div data-testid="results-count">{results.length}</div>
      {results.map((route: any) => (
        <div key={route.id} data-testid={`route-${route.id}`}>
          <span>{route.busNumber}</span>
          <button 
            data-testid={`buy-${route.id}`}
            onClick={() => onBuyTicket(route)}
          >
            Buy Ticket
          </button>
        </div>
      ))}
    </div>
  ),
}));

// Mock routesMockData
vi.mock('../Components/routesMocData', () => ({
  getRoutesBetween: vi.fn(),
  filterRoutesByTime: vi.fn(),
}));

// Reset alle mocks før hver test
beforeEach(() => {
  vi.clearAllMocks();
});


//Test at komponenten rendrer og viser brukerens navn

test('viser search page med riktig brukernavn', () => {
  // Lag mock-funksjoner
  const mockOnLogout = vi.fn();
  const mockOnNavigateToHome = vi.fn();
  const mockOnNavigateToPurchase = vi.fn();
  
  // Render komponenten
  render(
    <SearchPage 
      userName="Kudo Sofia"
      onLogout={mockOnLogout}
      onNavigateToHome={mockOnNavigateToHome}
      onNavigateToPurchase={mockOnNavigateToPurchase}
    />
  );
  
  // Sjekk at siden vises
  expect(screen.getByText('Search Travel')).toBeInTheDocument();
  
});


//Test at søkefunksjonen fungerer og viser resultater

test('søker etter ruter og viser resultater', async () => {
  // Lag mock-funksjoner
  const mockOnLogout = vi.fn();
  const mockOnNavigateToHome = vi.fn();
  const mockOnNavigateToPurchase = vi.fn();
  
  // Mock ruter som returneres (matcher ekte Route struktur)
  const mockRoutes = [
    {
      id: 'HS-1',
      busNumber: 'Bus 101',
      departureTime: '10:00',
      arrivalTime: '10:45',
      duration: '45 min',
      stops: ['Halden stasjon', 'Remmen', 'Sandbakken', 'St.OLavs voll', 'Sarpsborg bussterminal']
    },
    {
      id: 'HS-2',
      busNumber: 'Bus 102',
      departureTime: '13:00',
      arrivalTime: '13:45',
      duration: '45 min',
      stops: ['Halden stasjon', 'Remmen', 'Sandbakken', 'St.OLavs voll', 'Sarpsborg bussterminal']
    }
  ];
  
  // Mock at getRoutesBetween returnerer ruter
  vi.mocked(routesMockData.getRoutesBetween).mockReturnValue(mockRoutes);
  
  // Mock at filterRoutesByTime returnerer de samme rutene
  vi.mocked(routesMockData.filterRoutesByTime).mockReturnValue(mockRoutes);
  
  // Render komponenten
  render(
    <SearchPage 
      userName="Kudo Sofia"
      onLogout={mockOnLogout}
      onNavigateToHome={mockOnNavigateToHome}
      onNavigateToPurchase={mockOnNavigateToPurchase}
    />
  );
  
  // Klikk på søk-knappen
  const searchButton = screen.getByTestId('search-button');
  fireEvent.click(searchButton);
  
  // Vent på at state oppdateres
  await waitFor(() => {
    // Sjekk at resultater vises (antall ruter)
    expect(screen.getByTestId('results-count')).toHaveTextContent('2');
  });
  
  // Sjekk at getRoutesBetween ble kalt med riktige parametere
  expect(routesMockData.getRoutesBetween).toHaveBeenCalledWith('Halden', 'Sarpsborg');
  
  // Sjekk at filterRoutesByTime ble kalt
  expect(routesMockData.filterRoutesByTime).toHaveBeenCalledWith(mockRoutes, '10:00');
  
  // Sjekk at ruter vises
  expect(screen.getByText('Bus 101')).toBeInTheDocument();
  expect(screen.getByText('Bus 102')).toBeInTheDocument();
});



//Test at kjøp-funksjonen sender riktig data

test('kjøper billett og navigerer til purchase page', async () => {
  // Lag mock-funksjoner
  const mockOnLogout = vi.fn();
  const mockOnNavigateToHome = vi.fn();
  const mockOnNavigateToPurchase = vi.fn();
  
  // Mock en rute
  const mockRoute = {
    id: 'HS-1',
    busNumber: 'Bus 101',
    departureTime: '10:00',
    arrivalTime: '10:45',
    duration: '45 min',
    stops: ['Halden stasjon', 'Remmen', 'Sandbakken', 'St.OLavs voll', 'Sarpsborg bussterminal']
  };
  
  const mockRoutes = [mockRoute];
  
  vi.mocked(routesMockData.getRoutesBetween).mockReturnValue(mockRoutes);
  vi.mocked(routesMockData.filterRoutesByTime).mockReturnValue(mockRoutes);
  
  // Render komponenten
  render(
    <SearchPage 
      userName="Kudo Sofia"
      onLogout={mockOnLogout}
      onNavigateToHome={mockOnNavigateToHome}
      onNavigateToPurchase={mockOnNavigateToPurchase}
    />
  );
  
  // Først, gjør et søk for å få resultater
  const searchButton = screen.getByTestId('search-button');
  fireEvent.click(searchButton);
  
  // Vent på at resultater vises
  await waitFor(() => {
    expect(screen.getByTestId('results-count')).toHaveTextContent('1');
  });
  
  // Klikk på "Buy Ticket"
  const buyButton = screen.getByTestId('buy-HS-1');
  fireEvent.click(buyButton);
  
  // Sjekk at onNavigateToPurchase ble kalt
  expect(mockOnNavigateToPurchase).toHaveBeenCalled();
  
  // Sjekk booking data
  const bookingData = mockOnNavigateToPurchase.mock.calls[0][0];
  
  // Verifiser at booking data inneholder riktig informasjon
  expect(bookingData.from).toBe('Halden');
  expect(bookingData.to).toBe('Sarpsborg');
  expect(bookingData.departureTime).toBe('10:00');
  expect(bookingData.busNumber).toBe('Bus 101');
  expect(bookingData.duration).toBe('45 min');
  expect(bookingData.baseAmount).toBe(150);
  
  // Sjekk at stops array er med
  expect(bookingData.stops).toEqual(['Halden stasjon', 'Remmen', 'Sandbakken', 'St.OLavs voll', 'Sarpsborg bussterminal']);
});