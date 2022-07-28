import type { HTMLProps, FunctionComponent } from "react";
const Input: FunctionComponent<HTMLProps<HTMLInputElement>> = (props) => {
  return (
    <label className="border rounded-xl p-4 border-gray-1 flex focus-within:border-primary-action">
      <input
        {...props}
        className="text-sm focus:outline-none focus:border-none font-popins placeholder:text-gray-1"
      />
    </label>
  );
};

export default Input;
