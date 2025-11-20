import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateNewUser from '../Components/userPage';
import { vi, beforeEach } from 'vitest';
import * as virtualDB from '../Components/virtualDataBase';


vi.mock('../Components/virtualDataBase', () => ({
  emailExists: vi.fn(),
  addUser: vi.fn(),
  saveCurrentUser: vi.fn(),
}));


beforeEach(() => {
  vi.clearAllMocks();
});


//TEST 1: VELLYKKET REGISTRERING

test("vellykket registrering av ny bruker", () => {
  const mockOnBackToLogin = vi.fn();
  const mockOnRegisterSuccess = vi.fn();
  
  //en ny bruker som blir opprettet
  const mockNewUser = {
    id: 1,
    fullName: "Kudo Sofia",
    email: "kudo@test.no",
    password: "password123"
  };
  
  //Email IKKE finnes tillat registrering
  vi.mocked(virtualDB.emailExists).mockReturnValue(false);
  vi.mocked(virtualDB.addUser).mockReturnValue(mockNewUser);
  
  //window.alert
  const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
  
  render(
    <CreateNewUser 
      onBackToLogin={mockOnBackToLogin} 
      onRegisterSuccess={mockOnRegisterSuccess} 
    />
  );
  
  // Finn alle input-feltene
  const fullNameInput = screen.getByLabelText('FullName');
  const emailInput = screen.getByLabelText('E-mail');
  const passwordInput = screen.getByLabelText('Password');
  const confirmPasswordInput = screen.getByLabelText('Confirm Password');
  const createButton = screen.getByRole('button', { name: 'Create Account' });
  
  // Fyll inn alle feltene med gyldige data
  fireEvent.change(fullNameInput, { target: { value: 'Kudo Sofia' } });
  fireEvent.change(emailInput, { target: { value: 'kudo@test.no' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
  
  // Klikk på "Create Account"
  fireEvent.click(createButton);
  
  // Sjekk at emailExists ble kalt
  expect(virtualDB.emailExists).toHaveBeenCalledWith('kudo@test.no');
  
  // Sjekk at addUser ble kalt med riktige verdier
  expect(virtualDB.addUser).toHaveBeenCalledWith('Kudo Sofia', 'kudo@test.no', 'password123');
  
  // Sjekk at saveCurrentUser ble kalt
  expect(virtualDB.saveCurrentUser).toHaveBeenCalledWith(mockNewUser);
  
  // Sjekk at alert ble vist
  expect(alertMock).toHaveBeenCalled();
  
  // Sjekk at onRegisterSuccess ble kalt med brukerens navn
  expect(mockOnRegisterSuccess).toHaveBeenCalledWith('Kudo Sofia');
  
  alertMock.mockRestore();
});


// TEST PASSORDENE MATCHER IKKE
test("viser feilmelding når passordene ikke matcher", () => {
  const mockOnBackToLogin = vi.fn();
  const mockOnRegisterSuccess = vi.fn();
  
  render(
    <CreateNewUser 
      onBackToLogin={mockOnBackToLogin} 
      onRegisterSuccess={mockOnRegisterSuccess} 
    />
  );
  
  // Finn alle input-feltene
  const fullNameInput = screen.getByLabelText("FullName");
  const emailInput = screen.getByLabelText("E-mail");
  const passwordInput = screen.getByLabelText("Password");
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  const createButton = screen.getByRole('button', { name: "Create Account" });
  
  // Fyll inn feltene med ulike passord
  fireEvent.change(fullNameInput, { target: { value: "Kudo Sofia" } });
  fireEvent.change(emailInput, { target: { value: "kudo@test.no" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "password456" } });
  
  fireEvent.click(createButton);
  
  // Sjekk at feilmelding vises
  const errorMessage = screen.getByText("Passwords don't match!");
  expect(errorMessage).toBeInTheDocument();
  
  // Sjekk at addUser IKKE ble kalt
  expect(virtualDB.addUser).not.toHaveBeenCalled();
  
  // Sjekk at onRegisterSuccess IKKE ble kalt
  expect(mockOnRegisterSuccess).not.toHaveBeenCalled();
});


// TEST at EMAIL FINNES ALLEREDE
test("viser feilmelding når email allerede finnes", () => {
  const mockOnBackToLogin = vi.fn();
  const mockOnRegisterSuccess = vi.fn();
  
  vi.mocked(virtualDB.emailExists).mockReturnValue(true);
  
  render(
    <CreateNewUser 
      onBackToLogin={mockOnBackToLogin} 
      onRegisterSuccess={mockOnRegisterSuccess} 
    />
  );
  
  const fullNameInput = screen.getByLabelText("FullName");
  const emailInput = screen.getByLabelText("E-mail");
  const passwordInput = screen.getByLabelText("Password");
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  const createButton = screen.getByRole("button", { name: "Create Account" });
  
  fireEvent.change(fullNameInput, { target: { value: "Kudo Sofia" } });
  fireEvent.change(emailInput, { target: { value: "existing@mail.no" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
  
  fireEvent.click(createButton);
  
  expect(virtualDB.emailExists).toHaveBeenCalledWith('existing@mail.no');
  
  // Sjekk at feilmelding vises
  const errorMessage = screen.getByText('This email is already registered');
  expect(errorMessage).toBeInTheDocument();
  
  // Sjekk at addUser IKKE ble kalt
  expect(virtualDB.addUser).not.toHaveBeenCalled();
  
  // Sjekk at onRegisterSuccess IKKE ble kalt
  expect(mockOnRegisterSuccess).not.toHaveBeenCalled();
});