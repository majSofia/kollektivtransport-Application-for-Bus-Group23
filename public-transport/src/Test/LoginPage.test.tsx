import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Components/logInPage';
import { vi, beforeEach, expect, test } from 'vitest';
import * as virtualDB from '../Components/virtualDataBase';

// Mock virtualDataBase
vi.mock('../Components/virtualDataBase', () => ({
  validateLogin: vi.fn(),
  debugShowAllUsers: vi.fn(),
  saveCurrentUser: vi.fn(),
}));

// Reset alle mocks før hver test
beforeEach(() => {
  vi.clearAllMocks();
});

test("viser login-skjema", () => {
  
  const mockOnCreateAccount = vi.fn();
  const mockOnLoginSuccess = vi.fn();
  
  // Render komponenten
  render(
    <Login 
      onCreateAccount={mockOnCreateAccount} 
      onLoginSuccess={mockOnLoginSuccess} 
    />
  );
  
  // Sjekk at overskriften vises
  const heading = screen.getByText("Welcome to Kudo Transport");
  expect(heading).toBeInTheDocument();
});

test("vellykket innlogging", () => {
  const mockOnCreateAccount = vi.fn();
  const mockOnLoginSuccess = vi.fn();
  
  // vellykket login
  const mockUser = {
    id: 1,
    fullName: "Test Bruker",
    email: "test@mail.no",
    password: "123456"
  };
  
  vi.mocked(virtualDB.validateLogin).mockReturnValue(mockUser);
  
  // Render komponenten
  render(
    <Login 
      onCreateAccount={mockOnCreateAccount} 
      onLoginSuccess={mockOnLoginSuccess} 
    />
  );
  
  // Finn input-feltene
  const emailInput = screen.getByLabelText("E-mail");
  const passwordInput = screen.getByLabelText("Password");
  const loginButton = screen.getByRole("button", { name: "Login" });
  
  // Fyll inn email og passord
  fireEvent.change(emailInput, { target: { value: "test@mail.no" } });
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  
  // Klikk på login-knappen
  fireEvent.click(loginButton);
  
  // Sjekk at validateLogin ble kalt med riktige verdier
  expect(virtualDB.validateLogin).toHaveBeenCalledWith('test@mail.no', '123456');
  
  // Sjekk at saveCurrentUser ble kalt
  expect(virtualDB.saveCurrentUser).toHaveBeenCalledWith(mockUser);
  
  // Sjekk at onLoginSuccess ble kalt med brukerens navn
  expect(mockOnLoginSuccess).toHaveBeenCalledWith('Test Bruker');
});

test("klikk login uten å fylle ut feltene", () => {
  const mockOnCreateAccount = vi.fn();
  const mockOnLoginSuccess = vi.fn();
  
  // Render komponenten
  render(
    <Login 
      onCreateAccount={mockOnCreateAccount} 
      onLoginSuccess={mockOnLoginSuccess} 
    />
  );
  
  // Finn login-knappen
  const loginButton = screen.getByRole("button", { name: "Login" });
  
  // Klikk på login uten å fylle ut noe
  fireEvent.click(loginButton);
  
  // Sjekk at feilmelding vises
  const errorMessage = screen.getByText("Please complete all fields");
  expect(errorMessage).toBeInTheDocument();
  
  // Sjekk at onLoginSuccess IKKE ble kalt
  expect(mockOnLoginSuccess).not.toHaveBeenCalled();
});

test("mislykket innlogging - feil passord", () => {
  const mockOnCreateAccount = vi.fn();
  const mockOnLoginSuccess = vi.fn();
  
  //validateLogin returnerer null (feil passord/bruker)
  vi.mocked(virtualDB.validateLogin).mockReturnValue(null);
  
  render(
    <Login 
      onCreateAccount={mockOnCreateAccount} 
      onLoginSuccess={mockOnLoginSuccess} 
    />
  );
  
  const emailInput = screen.getByLabelText("E-mail");
  const passwordInput = screen.getByLabelText("Password");
  const loginButton = screen.getByRole("button", { name: "Login" });
  
  fireEvent.change(emailInput, { target: { value: "feil@mail.no" } });
  fireEvent.change(passwordInput, { target: { value: "feilpassord" } });
  
  // Klikk på login-knappen
  fireEvent.click(loginButton);
  
  // Sjekk at validateLogin ble kalt
  expect(virtualDB.validateLogin).toHaveBeenCalledWith('feil@mail.no', 'feilpassord');
  
  // Sjekk at feilmelding vises
  const errorMessage = screen.getByText('User not found');
  expect(errorMessage).toBeInTheDocument();
  
  // Sjekk at onLoginSuccess IKKE ble kalt
  expect(mockOnLoginSuccess).not.toHaveBeenCalled();
  
  // Sjekk at saveCurrentUser IKKE ble kalt
  expect(virtualDB.saveCurrentUser).not.toHaveBeenCalled();
});