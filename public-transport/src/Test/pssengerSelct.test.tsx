import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PassengerSelector from '../Components/PassengerSelect';
import { vi, beforeEach, expect, test } from 'vitest';

// Reset alle mocks før hver test
beforeEach(() => {
  vi.clearAllMocks();
});


//Test At man kan legge til passasjerer

test('legger til ny passasjer når "Add passengers" klikkes', () => {
  // Lag mock-funksjoner
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();
  
  // Render komponenten (åpen)
  render(
    <PassengerSelector 
      isOpen={true}
      onClose={mockOnClose}
      onConfirm={mockOnConfirm}
    />
  );
  
  // Sjekk at dropdown er synlig
  expect(screen.getByText('Select passengers')).toBeInTheDocument();
  
  // Sjekk initial state - 0 passasjerer
  expect(screen.getByText('Total: 0 passenger(s)')).toBeInTheDocument();
  
  // Finn "Add passengers" knappen
  const addButton = screen.getByText('+ Add passengers');
  
  // Klikk for å legge til en passasjer
  fireEvent.click(addButton);
  
  // Sjekk at passasjer ble lagt til
  expect(screen.getByText('Passenger 1')).toBeInTheDocument();
  expect(screen.getByText('Total: 1 passenger(s)')).toBeInTheDocument();
  
  // Legg til en passasjer til
  fireEvent.click(addButton);
  
  // Sjekk at vi nå har 2 passasjerer
  expect(screen.getByText('Passenger 1')).toBeInTheDocument();
  expect(screen.getByText('Passenger 2')).toBeInTheDocument();
  expect(screen.getByText('Total: 2 passenger(s)')).toBeInTheDocument();
});


//Test at man kan endre passasjertype
test("endrer passasjertype fra adult til student", () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();
  
  // Start med en voksen passasjer
  const initialPassengers = [
    { id: 1, type: "adult" as const }
  ];
  render(
    <PassengerSelector 
      isOpen={true}
      onClose={mockOnClose}
      onConfirm={mockOnConfirm}
      initialPassengers={initialPassengers}
    />
  );
  //Finn passajerer type select dropdown
  const typeSelect = screen.getByDisplayValue("Adult") as HTMLSelectElement;
  //Sjekker at initial verdi er voksen
  expect(typeSelect.value).toBe("adult");
  //Endre til student
  fireEvent.change(typeSelect, { target: { value: "student" } });
  //Sjekker at verdien er oppdatert
  expect(typeSelect.value).toBe("student");
  
  //Sjekker at Student nå er valgt
  expect(screen.getByDisplayValue("Student")).toBeInTheDocument();
});



//Test at man kan fjerne passasjerer og bekrefte

test('fjerner passasjer og bekrefter valg', () => {
  // Lag mock-funksjoner
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();
  
  // Start med 2 passasjerer
  const initialPassengers = [
    { id: 1, type: 'adult' as const },
    { id: 2, type: 'student' as const }
  ];
  
  // Render komponenten
  render(
    <PassengerSelector 
      isOpen={true}
      onClose={mockOnClose}
      onConfirm={mockOnConfirm}
      initialPassengers={initialPassengers}
    />
  );
  
  // Sjekk at vi har 2 passasjerer
  expect(screen.getByText('Passenger 1')).toBeInTheDocument();
  expect(screen.getByText('Passenger 2')).toBeInTheDocument();
  expect(screen.getByText('Total: 2 passenger(s)')).toBeInTheDocument();
  
  // Finn alle fjern-knapper (🗑️)
  const removeButtons = screen.getAllByRole('button', { name: '🗑️' });
  
  // Fjern første passasjer
  fireEvent.click(removeButtons[0]);
  
  // Sjekk at vi nå har 1 passasjer
  expect(screen.queryByText('Passenger 2')).not.toBeInTheDocument();
  expect(screen.getByText('Total: 1 passenger(s)')).toBeInTheDocument();
  
  // Finn confirm knappen
  const confirmButton = screen.getByText('Confirm');
  
  // Klikk på confirm
  fireEvent.click(confirmButton);
  
  // Sjekk at onConfirm ble kalt
  expect(mockOnConfirm).toHaveBeenCalled();
  
  // Sjekk at onConfirm ble kalt med 1 passasjer
  const confirmedPassengers = mockOnConfirm.mock.calls[0][0];
  expect(confirmedPassengers).toHaveLength(1);
  expect(confirmedPassengers[0].type).toBe('student');
});