import { HomeIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNavigation() {
  const { pathname } = useLocation();

  const navItems = [
    { href: "/", label: "홈", icon: HomeIcon },
    { href: "/a", label: "홈", icon: HomeIcon },
    { href: "/b", label: "홈", icon: HomeIcon },
    { href: "/c", label: "홈", icon: HomeIcon },
  ];

  return (
    <div
      id="bottom-navigation"
      className="fixed bottom-0 z-20 flex w-full flex-col items-center justify-center transition duration-300 ease-in-out"
    >
      <div className="flex w-full max-w-lg flex-row items-center justify-between px-3 pb-safe-bottom border-t">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            to={href}
            className="flex flex-1 flex-col items-center justify-center gap-0.5 py-1"
            style={{ height: 56 }}
          >
            <span className={pathname === href ? "text-primary" : "text-gray-400"}>
              <Icon className="h-6 w-6" />
            </span>
            <span className={`text-xs ${pathname === href ? "text-primary" : "text-gray-400"}`}>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
