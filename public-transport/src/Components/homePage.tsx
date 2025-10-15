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

interface HomePageProps {
  userName: string;
  onLogout: () => void;
  onNavigateToSearch: () => void;
  activeTickets: Ticket[];
  upcomingTrips: Ticket[];
}

