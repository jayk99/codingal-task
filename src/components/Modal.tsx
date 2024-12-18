import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onConfirm, onCancel }) => {
  const [mainReason, setMainReason] = useState<string | null>(null);
  const [subReason, setSubReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState("");
  const [isEndClassDisabled, setIsEndClassDisabled] = useState(true);

  const mainReasons = ["Class completed", "Class interrupted/aborted"];

  const subReasons = [
    "Student didn't show up for the class.",
    "Student didn't show any interest.",
    "Student got disconnected.",
    "I got disconnected.",
    "Other reason",
  ];

  useEffect(() => {
    const isValid =
      mainReason === "Class completed" ||
      (mainReason === "Class interrupted/aborted" &&
        subReason &&
        (subReason !== "Other reason" || otherReason.trim() !== ""));
    setIsEndClassDisabled(!isValid);
  }, [mainReason, subReason, otherReason]);

  const handleMainReasonSelect = (reason: string) => {
    setMainReason((prev) => (prev === reason ? null : reason));
    setSubReason(null);
    setOtherReason("");
  };

  const handleSubReasonSelect = (reason: string) => {
    setSubReason((prev) => (prev === reason ? null : reason));
    if (reason !== "Other reason") setOtherReason("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[20px] w-full max-w-[480px] p-6 sm:p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-6 sm:mb-8 pr-8">
          Select a reason to end class
        </h2>

        <div className="space-y-4">
          {mainReasons.map((reason) => (
            <button
              key={reason}
              onClick={() => handleMainReasonSelect(reason)}
              className="flex items-center w-full text-left group"
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                ${
                  mainReason === reason
                    ? "border-[#F87171] bg-[#F87171]"
                    : "border-gray-300"
                }`}
              >
                {mainReason === reason && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 text-white"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                )}
              </div>
              <span className="ml-3 text-base sm:text-[17px] text-gray-700 font-normal">
                {reason}
              </span>
            </button>
          ))}

          <AnimatePresence>
            {mainReason === "Class interrupted/aborted" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden ml-4 sm:ml-8"
              >
                <div className="pt-2 space-y-4">
                  {subReasons.map((reason) => (
                    <button
                      key={reason}
                      onClick={() => handleSubReasonSelect(reason)}
                      className="flex items-center w-full text-left group"
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                        ${
                          subReason === reason
                            ? "border-[#F87171] bg-[#F87171]"
                            : "border-gray-300"
                        }`}
                      >
                        {subReason === reason && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 text-white"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </motion.svg>
                        )}
                      </div>
                      <span className="ml-3 text-base sm:text-[17px] text-gray-700 font-normal">
                        {reason}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {subReason === "Other reason" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pt-2 ml-4 sm:ml-8"
              >
                <textarea
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="Type here"
                  className="w-full p-4 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:border-[#F87171] focus:ring-0 min-h-[120px] text-sm sm:text-[15px] outline-none resize-none"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 sm:px-6 py-2.5 text-gray-500 hover:text-gray-700 text-base sm:text-[17px] font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isEndClassDisabled}
            className={`px-4 sm:px-6 py-2.5 text-white rounded-lg text-base sm:text-[17px] font-medium transition-colors
              ${
                isEndClassDisabled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#F87171] hover:bg-[#EF4444]"
              }`}
          >
            End Class
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
