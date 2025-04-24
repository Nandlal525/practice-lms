import SidebarItem from "./sidebaritems";

export default function Sidebar() {
  return (
    <aside className="w-[20%] h-full bg-amber-200">
      {/* Title and Logo */}
      <div className="h-[10%] flex items-center justify-center">
        <h1 className="text-lg font-bold">LMS APP</h1>
      </div>

      {/* Menu Items */}
      <div className="w-full">
        <ul className="flex flex-col gap-1 w-full">
          <SidebarItem to="/books" label="Books" />
          <SidebarItem to="/members" label="Members" />
          <SidebarItem to="/transactions" label="Transactions" />
        </ul>
      </div>
    </aside>
  );
}