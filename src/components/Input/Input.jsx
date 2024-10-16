export const Input = ({ type, name, className, onChange, placeholder, value, disabled }) => (
  <input
    type={type}
    name={name}
    className={className}
    onChange={onChange}
    placeholder={placeholder}
    value={value}
    disabled={disabled}
  />
);
