const btnType = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  outline: "btn--outline",
  danger: "btn--danger",
};

export default function Button({
  children,
  // onClick,
  variant = "primary",
  className,
  ...rest
}) {
  return (
    <button
      // onclick={onClick}
      className={`btn ${btnType[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
