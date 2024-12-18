import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchPassengers } from "../services/api";
import { Passenger as PassengerType } from "../types/passenger";

const Passenger = () => {
  const [passengers, setPassengers] = useState<PassengerType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPassengerData = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchPassengers(pageNum, 10);
      if (response?.data?.length) {
        setPassengers(response.data);
      } else {
        setPassengers([]);
        setError("No passengers found for the current page.");
      }
    } catch (err) {
      console.error("Error fetching passengers:", err);
      setError("Failed to fetch passengers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPassengerData(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNum: number) => {
    if (pageNum < 1) return;
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 md:px-20 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-medium text-center mb-8">Passengers List</h1>

      {error && (
        <motion.div
          className="text-red-600 bg-red-100 p-4 rounded mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {loading ? (
        <div className="flex justify-center items-center my-10">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
        </div>
      ) : (
        <motion.div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {passengers.map((passenger) => (
            <motion.div
              key={passenger._id}
              className="p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-medium">{passenger.name}</h2>
                <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded">
                  Trips: {passenger.trips}
                </span>
              </div>
              <div className="mt-3 space-y-4">
                {passenger.airline.map((airline) => (
                  <div
                    key={airline.id}
                    className="border-t pt-4 flex items-center space-x-4"
                  >
                    <img
                      src={airline.logo}
                      alt={airline.name}
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h3 className="text-sm font-semibold">{airline.name}</h3>
                      <p className="text-sm text-gray-500">{airline.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!loading && !error && passengers.length === 0 && (
        <motion.div
          className="text-center text-gray-600 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No passengers found.
        </motion.div>
      )}

      <div className="flex justify-center items-center mt-10 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-4">{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Passenger;
