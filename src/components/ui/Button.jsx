function Button({ variant = "primary", children, type = "button" }) {
  const className = variant === "secondary" ? "button button--secondary" : "button button--primary";
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}

export default Button;
