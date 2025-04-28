export const Spinner = ({
  size = 24,
  thickness = 3,
  bgColor = "#2147ec",
  color = "#fff",
  className = "",
}) => {
  return (
    <div
      className={`inline-block border-solid rounded-full transform translate-z-0 animate-[spin_1.1s_linear_infinite] ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${thickness}px`,
        borderColor: bgColor,
        borderLeftColor: color,
      }}
      aria-busy="true"
      aria-label="Loading"
      role="status"
    />
  );
};
