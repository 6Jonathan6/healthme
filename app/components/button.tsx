import clsx from "clsx";
import type { FC, DetailedHTMLProps, ButtonHTMLAttributes } from "react";

const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className={clsx(
        "px-5 py-2 bg-primary-action text-white font-popins border text-sm rounded-xl hover:bg-secondary",
        rest.className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
