// Mock data for bus routes

export interface Route {
  id: string;
  busNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string[];
  
}

export const routesData: { [key: string]: Route[] } = {
  'Halden-Sarpsborg': [
    {
      id: 'HS-1',
      busNumber: 'Bus 101',
      departureTime: '07:00',
      arrivalTime: '07:45',
      duration: '45 min',
      stops: ['Halden stasjon', 'Remmen', 'Sandbakken', 'St.OLavs voll', 'Sarpsborg bussterminal'],
      
    },
    {
      id: 'HS-2',
      busNumber: 'Bus 102',
      departureTime: '10:00',
      arrivalTime: '10:45',
      duration: '45 min',
      stops: ['Halden stasjon', 'Remmen', 'Sandbakken', 'St.OLavs voll', 'Sarpsborg bussterminal'],
      
    },
    {
      id: 'HS-3',
      busNumber: 'Bus 103',
      departureTime: '13:00',
      arrivalTime: '13:45',
      duration: '45 min',
      stops: ['Halden stasjon', 'Remmen', 'Sandbakken', 'St.OLavs voll', 'Sarpsborg bussterminal'],
      
    },
    {
      id: 'HS-4',
      busNumber: 'Bus 104',
      departureTime: '16:00',
      arrivalTime: '16:45',
      duration: '45 min',
      stops: ['Halden stasjon', 'Remmen', 'Sandbakken', 'St.OLavs voll', 'Sarpsborg bussterminal'],
      
    },
    {
      id: 'HS-5',
      busNumber: 'Bus 105',
      departureTime: '19:00',
      arrivalTime: '19:45',
      duration: '45 min',
      stops: ['Halden stasjon', 'Remmen', 'Sandbakken', 'St.OLavs voll', 'Sarpsborg bussterminal'],
      
    }
  ],
  'Sarpsborg-Halden': [
    {
      id: 'SH-1',
      busNumber: 'Bus 201',
      departureTime: '07:30',
      arrivalTime: '08:15',
      duration: '45 min',
      stops: ['Sarpsborg bussterminal', 'St.OLavs voll', 'Sandbakken', 'Remmen', 'Halden stasjon'],
      
    },
    {
      id: 'SH-2',
      busNumber: 'Bus 202',
      departureTime: '10:30',
      arrivalTime: '11:15',
      duration: '45 min',
      stops: ['Sarpsborg bussterminal', 'St.OLavs voll', 'Sandbakken', 'Remmen', 'Halden stasjon'],
      
    },
    {
      id: 'SH-3',
      busNumber: 'Bus 203',
      departureTime: '13:30',
      arrivalTime: '14:15',
      duration: '45 min',
      stops: ['Sarpsborg bussterminal', 'St.OLavs voll', 'Sandbakken', 'Remmen', 'Halden stasjon'],
      
    },
    {
      id: 'SH-4',
      busNumber: 'Bus 204',
      departureTime: '16:30',
      arrivalTime: '17:15',
      duration: '45 min',
      stops: ['Sarpsborg bussterminal', 'St.OLavs voll', 'Sandbakken', 'Remmen', 'Halden stasjon'],
      
    },
    {
      id: 'SH-5',
      busNumber: 'Bus 205',
      departureTime: '19:30',
      arrivalTime: '20:15',
      duration: '45 min',
      stops: ['Sarpsborg bussterminal', 'St.OLavs voll', 'Sandbakken', 'Remmen', 'Halden stasjon'],
      
    }
  ],
  'Halden-Fredrikstad': [
    {
      id: 'HF-1',
      busNumber: 'Bus 301',
      departureTime: '07:00',
      arrivalTime: '08:00',
      duration: '60 min',
      stops: ['Halden stasjon', 'Tistedal', 'Sarpsborg', 'Borg', 'Fredrikstad bussterminal'],
      
    },
    {
      id: 'HF-2',
      busNumber: 'Bus 302',
      departureTime: '10:00',
      arrivalTime: '11:00',
      duration: '60 min',
      stops: ['Halden stasjon', 'Tistedal', 'Sarpsborg', 'Borg', 'Fredrikstad bussterminal'],
      
    },
    {
      id: 'HF-3',
      busNumber: 'Bus 303',
      departureTime: '13:00',
      arrivalTime: '14:00',
      duration: '60 min',
      stops: ['Halden stasjon', 'Tistedal', 'Sarpsborg', 'Borg', 'Fredrikstad bussterminal'],
      
    },
    {
      id: 'HF-4',
      busNumber: 'Bus 304',
      departureTime: '16:00',
      arrivalTime: '17:00',
      duration: '60 min',
      stops: ['Halden stasjon', 'Tistedal', 'Sarpsborg', 'Borg', 'Fredrikstad bussterminal'],
      
    },
    {
      id: 'HF-5',
      busNumber: 'Bus 305',
      departureTime: '19:00',
      arrivalTime: '20:00',
      duration: '60 min',
      stops: ['Halden stasjon', 'Tistedal', 'Sarpsborg', 'Borg', 'Fredrikstad bussterminal'],
      
    }
  ],
  'Fredrikstad-Halden': [
    {
      id: 'FH-1',
      busNumber: 'Bus 401',
      departureTime: '07:30',
      arrivalTime: '08:30',
      duration: '60 min',
      stops: ['Fredrikstad bussterminal', 'Borg', 'Sarpsborg', 'Tistedal', 'Halden stasjon'],
      
    },
    {
      id: 'FH-2',
      busNumber: 'Bus 402',
      departureTime: '10:30',
      arrivalTime: '11:30',
      duration: '60 min',
      stops: ['Fredrikstad bussterminal', 'Borg', 'Sarpsborg', 'Tistedal', 'Halden stasjon'],
      
    },
    {
      id: 'FH-3',
      busNumber: 'Bus 403',
      departureTime: '13:30',
      arrivalTime: '14:30',
      duration: '60 min',
      stops: ['Fredrikstad bussterminal', 'Borg', 'Sarpsborg', 'Tistedal', 'Halden stasjon'],
      
    },
    {
      id: 'FH-4',
      busNumber: 'Bus 404',
      departureTime: '16:30',
      arrivalTime: '17:30',
      duration: '60 min',
      stops: ['Fredrikstad bussterminal', 'Borg', 'Sarpsborg', 'Tistedal', 'Halden stasjon'],
      
    },
    {
      id: 'FH-5',
      busNumber: 'Bus 405',
      departureTime: '19:30',
      arrivalTime: '20:30',
      duration: '60 min',
      stops: ['Fredrikstad bussterminal', 'Borg', 'Sarpsborg', 'Tistedal', 'Halden stasjon'],
      
    }
  ],
  'Fredrikstad-Sarpsborg': [
    {
      id: 'FH-1',
      busNumber: 'Bus 501',
      departureTime: '07:30',
      arrivalTime: '08:30',
      duration: '60 min',
      stops: ['Fredrikstad bussterminal', 'Råbekken', 'Greåker', 'Alvim', 'Sarpsborg bussterminal'],
      
    },
    {
      id: 'FH-2',
      busNumber: 'Bus 502',
      departureTime: '10:30',
      arrivalTime: '11:30',
      duration: '60 min',
      stops: ['Fredrikstad bussterminal', 'Råbekken', 'Greåker', 'Alvim', 'Sarpsborg bussterminal'],
      
    },
    {
      id: 'FH-3',
      busNumber: 'Bus 503',
      departureTime: '13:30',
      arrivalTime: '14:30',
      duration: '60 min',
      stops: ['Fredrikstad bussterminal', 'Råbekken', 'Greåker', 'Alvim', 'Sarpsborg bussterminal'],
      
    },
    {
      id: 'FH-4',
      busNumber: 'Bus 504',
      departureTime: '16:30',
      arrivalTime: '17:30',
      duration: '60 min',
      stops: ['Fredrikstad bussterminal', 'Råbekken', 'Greåker', 'Alvim', 'Sarpsborg bussterminal'],
      
    },
    {
      id: 'FH-5',
      busNumber: 'Bus 505',
      departureTime: '19:30',
      arrivalTime: '20:30',
      duration: '60 min',
      stops: ['Fredrikstad bussterminal', 'Råbekken', 'Greåker', 'Alvim', 'Sarpsborg bussterminal'],
      
    }
  ],
  'Sarpsborg-Fredrikstad': [
    {
      id: 'FH-1',
      busNumber: 'Bus 601',
      departureTime: '07:30',
      arrivalTime: '08:30',
      duration: '60 min',
      stops: ['Sarpsborg bussterminal', 'Alvim','Greåker','Råbekken','Fredrikstad bussterminal'],
      
    },
    {
      id: 'FH-2',
      busNumber: 'Bus 602',
      departureTime: '10:30',
      arrivalTime: '11:30',
      duration: '60 min',
      stops: ['Sarpsborg bussterminal', 'Alvim','Greåker','Råbekken','Fredrikstad bussterminal'],
      
    },
    {
      id: 'FH-3',
      busNumber: 'Bus 603',
      departureTime: '13:30',
      arrivalTime: '14:30',
      duration: '60 min',
      stops: ['Sarpsborg bussterminal', 'Alvim','Greåker','Råbekken','Fredrikstad bussterminal'],
      
    },
    {
      id: 'FH-4',
      busNumber: 'Bus 604',
      departureTime: '16:30',
      arrivalTime: '17:30',
      duration: '60 min',
      stops: ['Sarpsborg bussterminal', 'Alvim','Greåker','Råbekken','Fredrikstad bussterminal'],
      
    },
    {
      id: 'FH-5',
      busNumber: 'Bus 605',
      departureTime: '19:30',
      arrivalTime: '20:30',
      duration: '60 min',
      stops: ['Sarpsborg bussterminal', 'Alvim','Greåker','Råbekken','Fredrikstad bussterminal'],
      
    }
  ],

  
};


// Helper function to get routes between two locations
export const getRoutesBetween = (from: string, to: string): Route[] => {
  const routeKey = `${from}-${to}`;
  return routesData[routeKey] || [];
};

// Helper function to filter routes by time
export const filterRoutesByTime = (routes: Route[], selectedTime: string): Route[] => {
  const selectedHour = parseInt(selectedTime.split(':')[0]);
  return routes.filter(route => {
    const routeHour = parseInt(route.departureTime.split(':')[0]);
    return routeHour >= selectedHour;
  });
};