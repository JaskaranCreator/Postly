
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#FAF8FC] transition-colors duration-300 dark:bg-gray-950">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Navbar />

        <main className="min-h-screen bg-[#FAF8FC] p-4 transition-colors duration-300 sm:p-6 lg:p-8 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
