import { Passenger } from "../types/passenger";

interface PassengerCardProps {
  passenger: Passenger;
}

const PassengerCard: React.FC<PassengerCardProps> = ({ passenger }) => {
  const mainAirline = passenger.airline[0];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {mainAirline?.logo && (
          <img
            src={mainAirline.logo}
            alt={`${mainAirline.name} logo`}
            className="w-12 h-12 object-contain rounded"
          />
        )}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            {passenger.name}
          </h2>
          <div className="text-sm text-gray-500 space-y-1">
            <p>Trips: {passenger.trips}</p>
            {mainAirline && (
              <>
                <p>Airline: {mainAirline.name}</p>
                <p>Country: {mainAirline.country}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerCard;
