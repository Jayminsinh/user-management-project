const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg relative shadow-2xl min-w-100">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black hover:cursor-pointer"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
