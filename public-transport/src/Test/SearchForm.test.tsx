import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchForm from '../Components/SearchForm';
import { vi, beforeEach, expect, test } from 'vitest';

beforeEach(() => {
  vi.clearAllMocks();
});

// Test at søk fungerer når alle felt er fylt ut riktig
test("vellykket søk når alle felt er fylt ut", () => {
  
  const mockOnSearch = vi.fn();
  const mockOnOpenPassengerSelector = vi.fn();
  
  // Render komponenten med 2 passasjerer
  render(
    <SearchForm 
      onSearch={mockOnSearch}
      passengers={2}
      onOpenPassengerSelector={mockOnOpenPassengerSelector}
    />
  );
  // Finn alle feltene
  const fromSelect = screen.getByLabelText("From");
  const toSelect = screen.getByLabelText("To");
  const dateInput = screen.getByLabelText("Date");
  const timeSelect = screen.getByLabelText("Time");
  const searchButton = screen.getByRole("button", { name: "Search" });
  
  // velge fra destinasjon
  fireEvent.change(fromSelect, { target: { value: "Halden" } });
  
  // velge til destinasjon
  fireEvent.change(toSelect, { target: { value: "Sarpsborg" } });
  
  // velge en dato
  fireEvent.change(dateInput, { target: { value: "2025-12-15" } });
  
  // velge en tid
  fireEvent.change(timeSelect, { target: { value: "10:00" } });
  
  fireEvent.click(searchButton);
  // Sjekk at onSearch ble kalt med riktige verdier
  expect(mockOnSearch).toHaveBeenCalledWith({
    from: "Halden",
    to: "Sarpsborg",
    date: "2025-12-15",
    time: "10:00"
  });
});

//Test som gir feilmelding vises når ingen passasjerer er lagt til
test("viser alert når ingen passasjerer er valgt", () => {
  
  const mockOnSearch = vi.fn();
  const mockOnOpenPassengerSelector = vi.fn();
  
  //window.alert
  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
  // Render komponenten med 0 passasjerer
  render(
    <SearchForm 
      onSearch={mockOnSearch}
      passengers={0}
      onOpenPassengerSelector={mockOnOpenPassengerSelector}
    />
  );
  
  const fromSelect = screen.getByLabelText("From");
  const toSelect = screen.getByLabelText("To");
  const dateInput = screen.getByLabelText("Date");
  const timeSelect = screen.getByLabelText("Time");
  const searchButton = screen.getByRole("button", { name: "Search" });
  // Fyll inn alle feltene
  fireEvent.change(fromSelect, { target: { value: "Halden" } });
  fireEvent.change(toSelect, { target: { value: "Fredrikstad" } });
  fireEvent.change(dateInput, { target: { value: "2025-12-15" } });
  fireEvent.change(timeSelect, { target: { value: "14:00" } });
  
  fireEvent.click(searchButton);
  
  // Sjekk at alert gir riktig melding
  expect(alertMock).toHaveBeenCalledWith("Vennligst legg til minst en passasjer");
  
  // Sjekk at onSearch IKKE ble kalt
  expect(mockOnSearch).not.toHaveBeenCalled();
  
  alertMock.mockRestore();
});

//Test som sjekker at destinasjon ikke kan være samme som fra destinasjon
test("til-destinasjon filtreres basert på fra-destinasjon", () => {
 
  const mockOnSearch = vi.fn();
  const mockOnOpenPassengerSelector = vi.fn();
  
  render(
    <SearchForm 
      onSearch={mockOnSearch}
      passengers={1}
      onOpenPassengerSelector={mockOnOpenPassengerSelector}
    />
  );
  //Finn feltene
  const fromSelect = screen.getByLabelText("From") as HTMLSelectElement;
  const toSelect = screen.getByLabelText("To") as HTMLSelectElement;
  //Sjekk at til feltet er disabled i starten
  expect(toSelect).toBeDisabled();
  //Velg Halden byen som fra destinasjon
  fireEvent.change(fromSelect, { target: { value: "Halden" } });
  
  //Sjekk at til feltet nå er enabled
  expect(toSelect).not.toBeDisabled();
  
  //Sjekk at Halden ikke er tilgjengelig i til dropdown boksen
  const toOptions = Array.from(toSelect.options).map(opt => opt.value);
  expect(toOptions).not.toContain("Halden");
  //Sjekk at de andre byene er tilgjengelige
  expect(toOptions).toContain("Sarpsborg");
  expect(toOptions).toContain("Fredrikstad");
  
  //Velg en annen fra destinasjon
  fireEvent.change(fromSelect, { target: { value: "Sarpsborg" } });
  
  expect(toSelect.value).toBe('');
});