import { Form as RemixForm } from "@remix-run/react";
import React from "react";

const Form: React.FC<React.ComponentPropsWithoutRef<typeof RemixForm>> = ({
  children,
  ...rest
}) => {
  return (
    <RemixForm
      {...rest}
      className="border border-gray-1 rounded-xl max-w-lg p-8 "
    >
      {children}
    </RemixForm>
  );
};

export default Form;
