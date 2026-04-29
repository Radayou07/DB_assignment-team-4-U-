import { useState, useEffect } from 'react';

function Modal({ isOpen, onClose, title, children }) {
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      // Small delay to trigger animation
      setTimeout(() => setShow(true), 10);
    } else if (render) {
      setShow(false);
      // Wait for animation to finish before removing
      setTimeout(() => {
        setRender(false);
      }, 300); // Match this with duration-300
    }
  }, [isOpen]);

  if (!render) return null;

  const handleClose = () => {
    onClose(); // This calls Products' handleClose which sets isOpen=false
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div 
        className={`bg-white rounded-lg p-6 w-full max-w-lg shadow-2xl 
                   transition-all duration-300 ease-out  
                   ${show 
                     ? 'scale-100 opacity-100' 
                     : 'scale-0 opacity-0'
                   }`}                 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;