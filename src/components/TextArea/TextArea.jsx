export const TextArea = ({
  name,
  rows,
  cols,
  className,
  onChange,
  placeholder,
  value
}) => (
  <textarea
    name={name}
    rows={rows}
    cols={cols}
    className={className}
    onChange={onChange}
    placeholder={placeholder}
    value={value}
  />
);
