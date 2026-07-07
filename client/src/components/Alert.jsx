const styles = {
  error: 'bg-red-50 text-red-700 border-red-200',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
};

const Alert = ({ type = 'error', message, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`mb-4 flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${styles[type]}`}
      role="alert"
    >
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 font-medium opacity-70 hover:opacity-100"
          aria-label="Dismiss message"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
