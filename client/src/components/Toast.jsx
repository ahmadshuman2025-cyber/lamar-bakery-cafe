const Toast = ({ show, message, type, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed top-24 right-4 z-50 animate-slide-in">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-soft-hover ${
          type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        <i
          className={`fas ${
            type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
          } text-xl`}
        ></i>
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 hover:opacity-80 transition-opacity"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Toast;
