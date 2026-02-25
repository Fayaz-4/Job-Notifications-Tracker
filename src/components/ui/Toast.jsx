function Toast({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="true">
      <div className="toast">{message}</div>
    </div>
  );
}

export default Toast;
