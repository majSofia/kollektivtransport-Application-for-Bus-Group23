import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResults from '../Components/SearchResualt';
import { vi, beforeEach, expect, test } from 'vitest';

// Reset alle mocks før hver test
beforeEach(() => {
  vi.clearAllMocks();
});

// Hva testes: At ruter vises med korrekt informasjon
test('viser søkeresultater med riktig informasjon', () => {

  const mockOnBuyTicket = vi.fn();
  
  //routesMockData struktur
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
  
  //passasjerer
  const mockPassengers = [
    { id: 1, type: 'adult' as const }
  ];
  
  // Render komponenten
  render(
    <SearchResults 
      results={mockRoutes}
      fromLocation="Halden"
      toLocation="Sarpsborg"
      date="2025-12-15"
      passengers={mockPassengers}
      onBuyTicket={mockOnBuyTicket}
    />
  );
  
  // Sjekk at heading viser antall avganger
  expect(screen.getByText('2 available departures')).toBeInTheDocument();
  
  // Sjekk at destinasjoner vises
  expect(screen.getAllByText('Halden')).toHaveLength(2);
  expect(screen.getAllByText('Sarpsborg')).toHaveLength(2);
  
  // Sjekk at avgangstider vises
  expect(screen.getByText('10:00')).toBeInTheDocument();
  expect(screen.getByText('13:00')).toBeInTheDocument();
  
  // Sjekk at bussnummer vises
  expect(screen.getByText('🚌 Bus 101')).toBeInTheDocument();
  expect(screen.getByText('🚌 Bus 102')).toBeInTheDocument();
  
  // Sjekk at antall stops vises
  expect(screen.getAllByText('🛑 5 stops')).toHaveLength(2);
  
  // Sjekk at dato vises
  expect(screen.getAllByText('📅 2025-12-15')).toHaveLength(2);
});


//Test som viser prisen beregnes korrekt basert på passasjertype
test("beregner riktig totalpris med studentrabatt", () => {
  
  const mockOnBuyTicket = vi.fn();
  const mockRoutes = [
    {
      id: "HS-1",
      busNumber: "Bus 101",
      departureTime: "10:00",
      arrivalTime: "10:45",
      duration:"45 min",
      stops: ["Halden stasjon", "Remmen", "Sandbakken"]
    }
  ];
  
  // Test passasjerer: 1 adult + 1 student
  const mockPassengers = [
    { id: 1, type: 'adult' as const },
    { id: 2, type: 'student' as const }
  ];
  
  render(
    <SearchResults 
      results={mockRoutes}
      fromLocation="Halden"
      toLocation="Sarpsborg"
      date="2025-12-15"
      passengers={mockPassengers}
      onBuyTicket={mockOnBuyTicket}
    />
  );
  
  // Sjekk at basepris vises
  expect(screen.getByText('150 kr')).toBeInTheDocument();
  // Sjekk at antall passasjerer vises
  expect(screen.getByText('2')).toBeInTheDocument();
  
  const expectedTotal = '255.00 kr';
  // Sjekk at totalpris er riktig
  expect(screen.getByText(expectedTotal)).toBeInTheDocument();
});


//Test at stops expanderer og kollapser

test('viser og skjuler stops når toggle-knapp klikkes', () => {

  const mockOnBuyTicket = vi.fn();
  
  //rute med stops
  const mockRoutes = [
    {
      id: 'HS-1',
      busNumber: 'Bus 101',
      departureTime: '10:00',
      arrivalTime: '10:45',
      duration: '45 min',
      stops: ['Halden stasjon', 'Remmen', 'Sandbakken', 'St.OLavs voll', 'Sarpsborg bussterminal']
    }
  ];
  
  
  const mockPassengers = [
    { id: 1, type: 'adult' as const }
  ];
  
  // Render komponenten
  render(
    <SearchResults 
      results={mockRoutes}
      fromLocation="Halden"
      toLocation="Sarpsborg"
      date="2025-12-15"
      passengers={mockPassengers}
      onBuyTicket={mockOnBuyTicket}
    />
  );
  
  // Sjekk at stops IKKE vises i starten
  expect(screen.queryByText('Remmen')).not.toBeInTheDocument();
  expect(screen.queryByText('Sandbakken')).not.toBeInTheDocument();
  
  // Sjekk at toggle-ikonet viser ▼ (lukket)
  expect(screen.getByText('▼')).toBeInTheDocument();
  
  // Finn og klikk på "Stops: 5" knappen
  const stopsButton = screen.getByText('Stops: 5');
  fireEvent.click(stopsButton);
  
  // Sjekk at stops NÅ vises
  expect(screen.getByText('Halden stasjon')).toBeInTheDocument();
  expect(screen.getByText('Remmen')).toBeInTheDocument();
  expect(screen.getByText('Sandbakken')).toBeInTheDocument();
  expect(screen.getByText('St.OLavs voll')).toBeInTheDocument();
  expect(screen.getByText('Sarpsborg bussterminal')).toBeInTheDocument();
  
  // Sjekk at toggle-ikonet viser ▲ (åpen)
  expect(screen.getByText('▲')).toBeInTheDocument();
  
  // Klikk igjen for å lukke
  fireEvent.click(stopsButton);
  
  // Sjekk at stops er skjult igjen
  expect(screen.queryByText('Remmen')).not.toBeInTheDocument();
  expect(screen.queryByText('Sandbakken')).not.toBeInTheDocument();
});