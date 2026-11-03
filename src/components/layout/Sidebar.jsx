
import {
  LayoutDashboard,
  FileText,
  Images,
  Settings,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: "Overview", icon: LayoutDashboard, path: "/" },
    { name: "Posts", icon: FileText, path: "/posts" },
    { name: "Gallery", icon: Images, path: "/gallery" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-60 rounded-lg bg-white p-2 text-[#353044] shadow-md transition-colors md:hidden dark:bg-gray-800 dark:text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex min-h-screen w-64 flex-col
          border-r border-purple-100 bg-[#F8F5FB] p-5
          transition-colors duration-300
          md:static md:translate-x-0
          dark:border-gray-700 dark:bg-gray-900
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Postly branding */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A78BFA] text-white shadow-sm">
            <Sparkles size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#353044] dark:text-white">
              Postly
            </h1>
            <p className="text-xs text-[#82758F] dark:text-gray-400">
              Your creative space
            </p>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className="flex flex-col gap-2">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-[#A49AAF] dark:text-gray-500">
            Workspace
          </p>

          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#EDE4FA] text-[#7C5CB8] dark:bg-purple-900/40 dark:text-purple-300"
                      : "text-[#82758F] hover:bg-white hover:text-[#7C5CB8] dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-purple-300"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
