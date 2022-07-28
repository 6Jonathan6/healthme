import type { FC, DetailedHTMLProps, ButtonHTMLAttributes } from "react";

const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="px-5 py-2 bg-primary-action text-white font-popins border text-sm rounded-2xl hover:bg-secondary"
    >
      {children}
    </button>
  );
};

export default Button;
