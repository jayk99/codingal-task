import { useState } from "react";
import { Menu, X } from "lucide-react";
import Timer from "./Timer";
import Modal from "./Modal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const handleEndClass = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmEnd = () => {
    setIsTimerRunning(false);
    setShowModal(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center pr-4 border-r border-gray-300">
              <img
                className="h-7 w-7 rounded-sm"
                src="/public/codingal.png"
                alt="Codingal Logo"
              />
              <span className="ml-2 text-xl font-medium text-gray-900 md:hidden">
                Codingal
              </span>
            </div>
            <div className="hidden md:block ml-4">
              <span className="text-gray-700">Trial Lesson [Grade 1-3]</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Timer initialMinutes={10} isRunning={isTimerRunning} />
            <button
              onClick={handleEndClass}
              className="bg-[#F87171] hover:bg-[#EF4444] text-white px-4 py-2 rounded-md"
            >
              End class
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <div className="flex flex-col items-center space-y-4 py-4">
              <Timer initialMinutes={10} isRunning={isTimerRunning} />
              <button
                onClick={handleEndClass}
                className="bg-[#F87171] hover:bg-[#EF4444] text-white px-4 py-2 rounded-md w-full"
              >
                End class
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <Modal
          onClose={handleCloseModal}
          onConfirm={handleConfirmEnd}
          onCancel={handleCloseModal}
        />
      )}
    </nav>
  );
};

export default Navbar;
