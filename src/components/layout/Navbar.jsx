
import {
  Search,
  Bell,
  ChevronDown,
  Sparkles,
} from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-3 border-b border-purple-100 bg-white px-4 py-3 transition-colors duration-300 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-900">

      {/* Page heading */}
      <div className="ml-12 min-w-0 md:ml-0">
        <h2 className="text-xl font-semibold text-[#353044] dark:text-white">
          Overview
        </h2>

        <p className="hidden text-sm text-[#82758F] sm:block dark:text-gray-400">
          Welcome back to your creative space.
        </p>
      </div>

      {/* Right side actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-5">

        {/* Search field */}
        <div className="hidden items-center gap-2 rounded-xl border border-purple-100 bg-[#FAF8FC] px-4 py-2 sm:flex dark:border-gray-700 dark:bg-gray-800">
          <Search size={18} className="text-[#A49AAF] dark:text-gray-400" />

          <input
            type="text"
            placeholder="Search anything..."
            className="w-28 bg-transparent text-sm text-[#353044] outline-none placeholder:text-[#A49AAF] lg:w-40 dark:text-white dark:placeholder:text-gray-500"
          />
        </div>

        {/* Notification icon */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2 text-[#82758F] transition hover:bg-[#F8F5FB] dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#D69AB9]" />
        </button>

        {/* User profile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl p-2 transition hover:bg-[#F8F5FB] sm:gap-3 dark:hover:bg-gray-800"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDE4FA] text-[#7C5CB8] sm:h-10 sm:w-10 dark:bg-purple-900/50 dark:text-purple-300">
            <Sparkles size={20} />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-[#353044] dark:text-white">
              My Workspace
            </p>

            <p className="text-xs text-[#82758F] dark:text-gray-400">
              Creator
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-[#82758F] sm:block dark:text-gray-400"
          />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
