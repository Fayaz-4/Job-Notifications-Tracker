function Input({ id, label, placeholder }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <input id={id} className="input" placeholder={placeholder} />
    </label>
  );
}

export default Input;
