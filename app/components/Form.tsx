import { Form as RemixForm } from "@remix-run/react";
import clsx from "clsx";
import React from "react";

const Form: React.FC<React.ComponentPropsWithoutRef<typeof RemixForm>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <RemixForm
      {...rest}
      className={clsx(
        "border border-gray-1 rounded-xl max-w-lg p-8",
        className
      )}
    >
      {children}
    </RemixForm>
  );
};

export default Form;
