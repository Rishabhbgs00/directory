import { useState, useMemo } from "react";
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Briefcase,
  Image,
  DollarSign,
  Calendar,
  Users,
  Star,
  CreditCard,
  Wallet,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  HelpCircle,
  User,
} from "lucide-react";
import {
  useNavigate,
  useLocation,
  Outlet,
  useOutlet,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const DirectoryProviderLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const outlet = useOutlet();

  // Sidebar open/close state with localStorage memory
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("provider_sidebar") !== "collapsed";
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
      path: "/provider/dashboard",
    },
    {
      id: "business",
      label: "Business Setup",
      icon: Building2,
      badge: null,
      path: "/provider/business",
    },
    {
      id: "branches",
      label: "Manage Branches",
      icon: MapPin,
      badge: 3,
      path: "/provider/branches",
    },
    {
      id: "services",
      label: "Service List",
      icon: Briefcase,
      badge: null,
      path: "/provider/services",
    },
    {
      id: "gallery",
      label: "Gallery Manager",
      icon: Image,
      badge: null,
      path: "/provider/gallery",
    },
    {
      id: "pricing",
      label: "Pricing Editor",
      icon: DollarSign,
      badge: null,
      path: "/provider/pricing",
    },
    {
      id: "bookings",
      label: "Booking Requests",
      icon: Calendar,
      badge: 12,
      path: "/provider/bookings",
    },
    {
      id: "leads",
      label: "Leads",
      icon: Users,
      badge: 8,
      path: "/provider/leads",
    },
    {
      id: "reviews",
      label: "Reviews & Ratings",
      icon: Star,
      badge: 5,
      path: "/provider/reviews",
    },
    {
      id: "subscription",
      label: "Subscription Plan",
      icon: CreditCard,
      badge: null,
      path: "/provider/subscription",
    },
    {
      id: "earnings",
      label: "Settlement & Earnings",
      icon: Wallet,
      badge: null,
      path: "/provider/earnings",
    },
    {
      id: "settings",
      label: "Profile Settings",
      icon: Settings,
      badge: null,
      path: "/provider/settings",
    },
  ];

  const notifications = [
    {
      id: 1,
      text: "New booking request from John Doe",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      text: "Payment received: $450",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      text: "New review on your service",
      time: "3 hours ago",
      unread: false,
    },
  ];

  const providerInfo = {
    name: "Abdul Hakim",
    businessName: "Elite Services Co.",
    email: "ehanulhaque786@gmail.com",
    avatar: null,
    plan: "Premium",
  };

  // Active item based on URL (refresh safe)
  const activeItem = useMemo(() => {
    const match = navigationItems.find((item) =>
      location.pathname.startsWith(item.path)
    );
    return match || navigationItems[0];
  }, [location.pathname]);

  const toggleSidebar = () => {
    const updated = !isSidebarOpen;
    setIsSidebarOpen(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "provider_sidebar",
        updated ? "open" : "collapsed"
      );
    }
  };

  const handleNavClick = (item) => {
    navigate(item.path);
  };

  const handleLogout = () => {
    localStorage.removeItem("provider_token");
    navigate("/provider/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="bg-white border-r border-gray-200 flex flex-col overflow-hidden"
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {isSidebarOpen ? (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm">
                  Directory Pro
                </span>
                <span className="text-[11px] text-gray-400">
                  Near By MKT Provider Panel
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto shadow-md">
              <Building2 className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem.id === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center justify-between px-3 py-3 mb-1 rounded-lg transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                    }}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-blue-600" : "text-gray-500"
                      }`}
                    />
                  </motion.div>
                  {isSidebarOpen && (
                    <span className="font-medium text-sm">
                      {item.label}
                    </span>
                  )}
                </div>
                {isSidebarOpen && item.badge && (
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm"
                  >
                    {item.badge}
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        {isSidebarOpen && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-4 border-t border-gray-200"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white shadow-md relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-white/10 rounded-full" />
              <div className="flex items-center justify-between mb-2 relative z-10">
                <span className="text-sm font-semibold">
                  Premium Plan
                </span>
                <CreditCard className="w-4 h-4" />
              </div>
              <p className="text-xs opacity-90 mb-3 relative z-10">
                Valid until Dec 31, 2025
              </p>
              <button className="w-full bg-white text-blue-600 text-xs font-semibold py-2 rounded-lg hover:bg-gray-100 transition shadow-sm relative z-10">
                Manage Plan
              </button>
            </div>
          </motion.div>
        )}
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition shadow-sm"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-72 lg:w-96 shadow-inner"
            >
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search bookings, leads, services..."
                className="bg-transparent outline-none text-sm w-full"
              />
            </motion.div>
          </div>

          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationOpen((prev) => !prev);
                  setIsProfileOpen(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        Notifications
                      </h3>
                      <span className="text-xs text-gray-400">
                        {notifications.length} updates
                      </span>
                    </div>
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition ${
                            notif.unread ? "bg-blue-50/60" : ""
                          }`}
                        >
                          <p className="text-sm text-gray-900">
                            {notif.text}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notif.time}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t border-gray-200">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View All Notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Help */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen((prev) => !prev);
                  setIsNotificationOpen(false);
                }}
                className="flex items-center space-x-3 p-1.5 pr-2 hover:bg-gray-100 rounded-full transition"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-xs font-semibold">
                    {providerInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {providerInfo.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {providerInfo.businessName}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-semibold text-gray-900 text-sm">
                        {providerInfo.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {providerInfo.email}
                      </p>
                      <span className="inline-flex items-center mt-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-[11px] font-semibold rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5" />
                        {providerInfo.plan} Plan
                      </span>
                    </div>
                    <div className="py-2">
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>View Profile</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Account Settings</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                        <HelpCircle className="w-4 h-4" />
                        <span>Help & Support</span>
                      </button>
                    </div>
                    <div className="border-t border-gray-200 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            {/* Breadcrumb */}
            <div className="mb-4 md:mb-6">
              <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
                <span>Home</span>
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  {activeItem.label}
                </span>
              </div>
            </div>

            {/* Page Title */}
            <div className="mb-4 md:mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  {activeItem.label}
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                    Provider Panel
                  </span>
                </h1>
                <p className="text-gray-500 mt-1 text-xs md:text-sm">
                  Manage and configure your directory provider settings in Near
                  By MKT – ProviderFood.
                </p>
              </div>
            </div>

            {/* Content Area - children via Outlet OR placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 min-h-[260px]"
            >
              {outlet || (
                <div className="text-center py-10 md:py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                    {(() => {
                      const Icon = activeItem.icon;
                      return Icon ? (
                        <Icon className="w-8 h-8 text-gray-400" />
                      ) : null;
                    })()}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {activeItem.label} Content
                  </h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    This is where your{" "}
                    {activeItem.label.toLowerCase()} page content will be
                    displayed. Connect this layout with individual screens for
                    a fully dynamic provider experience.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DirectoryProviderLayout;
