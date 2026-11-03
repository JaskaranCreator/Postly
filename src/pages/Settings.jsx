
import { useEffect, useState } from "react";
import { User, Bell, Palette, Save } from "lucide-react";

function Settings() {
  const [profile, setProfile] = useState({
    name: "Postly User",
    email: "",
  });

  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("light");
  const [message, setMessage] = useState("");

  // Apply theme to the complete application
  const applyTheme = (selectedTheme) => {
    if (selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Load saved settings
  useEffect(() => {
    const savedSettings = localStorage.getItem("postlySettings");

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);

      setProfile(settings.profile || { name: "Postly User", email: "" });
      setNotifications(settings.notifications ?? true);

      const savedTheme = settings.theme || "light";
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("light");
    }
  }, []);

  // Save settings
  const handleSave = () => {
    const settings = {
      profile,
      notifications,
      theme,
    };

    localStorage.setItem("postlySettings", JSON.stringify(settings));
    applyTheme(theme);

    setMessage("Settings saved successfully!");

    setTimeout(() => setMessage(""), 3000);
  };

  // Handle theme selection
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;

    setTheme(selectedTheme);
    applyTheme(selectedTheme);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 text-[#353044] dark:text-gray-100">

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-[#353044] dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[#82758F] dark:text-gray-400">
          Manage your profile and application preferences.
        </p>
      </div>

      {/* Profile Settings */}
      <section className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-5 flex items-center gap-3">
          <User className="text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-semibold dark:text-white">
            Profile Information
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#82758F] dark:text-gray-400">
              Display Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="w-full rounded-xl border border-purple-100 bg-white px-4 py-3 text-gray-900 outline-none focus:border-purple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#82758F] dark:text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="w-full rounded-xl border border-purple-100 bg-white px-4 py-3 text-gray-900 outline-none focus:border-purple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-5 flex items-center gap-3">
          <Bell className="text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-semibold dark:text-white">
            Notifications
          </h2>
        </div>

        <label className="flex cursor-pointer items-center justify-between gap-4">
          <div>
            <p className="font-medium dark:text-white">
              Enable Notifications
            </p>
            <p className="mt-1 text-sm text-[#82758F] dark:text-gray-400">
              Save your notification preference.
            </p>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="h-5 w-5 accent-purple-600"
          />
        </label>
      </section>

      {/* Appearance Settings */}
      <section className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-5 flex items-center gap-3">
          <Palette className="text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-semibold dark:text-white">
            Appearance
          </h2>
        </div>

        <label className="mb-2 block text-sm font-medium text-[#82758F] dark:text-gray-400">
          Select Theme
        </label>

        <select
          value={theme}
          onChange={handleThemeChange}
          className="w-full rounded-xl border border-purple-100 bg-white px-4 py-3 text-gray-900 outline-none focus:border-purple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>

        <p className="mt-2 text-xs text-[#82758F] dark:text-gray-400">
          Your selected theme applies immediately and is saved locally.
        </p>
      </section>

      {/* Save Button */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-purple-700"
        >
          <Save size={18} />
          Save Settings
        </button>

        {message && (
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Settings;
