import { useState } from "react";
import Timer from "../components/Timer";
import Modal from "../components/Modal";

const ClassSession: React.FC = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setIsTimerRunning(false);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Timer initialMinutes={30} isRunning={isTimerRunning} />
      <button onClick={handleOpenModal}>End Class</button>

      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ClassSession;
