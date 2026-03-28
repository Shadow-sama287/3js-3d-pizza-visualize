import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface DraggableWindowProps {
  children: React.ReactNode;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* The floating toggle button — only visible when window is CLOSED */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--color-pizzaSystem-red)] text-white text-2xl shadow-xl hover:opacity-80 transition z-50 flex items-center justify-center cursor-pointer"
          >
            🍕
          </motion.button>
        )}
      </AnimatePresence>
      {/* The draggable window — only visible when OPEN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            drag
            dragConstraints={{ left: -1120, right: 30, top: -280, bottom: 30 }}
            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
            className="fixed bottom-10 right-10 w-96 h-96 bg-white rounded-2xl shadow-2xl overflow-hidden cursor-grab border-4 border-[var(--color-pizzaSystem-dark)] z-50"
          >
            {/* Header bar with close button */}
            <div className="w-full bg-[var(--color-pizzaSystem-dark)] text-white text-xs font-bold px-3 py-2 flex justify-between items-center select-none">
              <span className="pointer-events-none tracking-widest uppercase opacity-80">
                Drag window • Scroll to Zoom
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-red-400 text-lg leading-none pointer-events-auto cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="w-full h-[calc(100%-32px)]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DraggableWindow;
