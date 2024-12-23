export interface Airline {
  id: number;
  name: string;
  country: string;
  logo: string;
  slogan: string;
  head_quaters: string;
  website: string;
  established: string;
}

export interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline[]; 
}

export interface PassengerResponse {
  totalPassengers: number;
  totalPages: number;
  data: Passenger[];
}
