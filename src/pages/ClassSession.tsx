import { useState } from "react";
import Timer from "../components/Timer";
import Modal from "../components/Modal";

const ClassSession: React.FC = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setIsTimerRunning(false);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Timer initialMinutes={30} isRunning={isTimerRunning} />
      <button onClick={() => setIsModalOpen(true)}>End Class</button>

      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ClassSession;
