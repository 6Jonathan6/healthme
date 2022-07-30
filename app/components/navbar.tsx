import { NavLink } from "@remix-run/react";
import clsx from "clsx";
import type { FC, FunctionComponent } from "react";
import Button from "./button";

const NavItem: FC<{ to: string }> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={() =>
        clsx(
          "hover:text-secondary font-popins text-sm text-dark-gray px-4 py-2 hover:bg-lightest hover:rounded-2xl"
        )
      }
    >
      {children}
    </NavLink>
  );
};
const NavBar: FC = ({ children }) => {
  return (
    <nav className="p-4 flex items-center justify-center mx-auto z-50 border-b border-lightest gap-4 fixed top-0 left-0 right-0">
      <div className="max-w-5xl hidden md:flex items-center w-full">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/who-we-are">Who we are</NavItem>
        {/* <NavItem to="/track-meal">Track meal</NavItem> */}
      </div>
      <div className="ml-auto flex gap-4">
        {/* <Button className="ml-auto bg-white text-black border border-secondary">
          Sign up
        </Button> */}
        {children}
      </div>
    </nav>
  );
};
export default NavBar;
