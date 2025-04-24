import { NavLink } from "react-router";

interface SidebarItemProps {
  to: string;
  label: string;
}

export default function SidebarItem({ to, label }: SidebarItemProps) {
  return (
    <li className="w-full px-4">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `w-full flex px-4 py-2 rounded-md ${
            isActive ? "bg-black text-white" : ""
          }`
        }
      >
        <p className="text-lg">{label}</p>
      </NavLink>
    </li>
  );
}