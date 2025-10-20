import { Button } from "@/components/ui/button";
import { Menu, User, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";

const navLinks = [
  { path: "/", label: "Live" },
  { path: "/matches", label: "Matches" },
  { path: "/tournaments", label: "Tournaments" },
  { path: "/players", label: "Players" },
  { path: "/polls", label: "Polls" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    console.log(`Dark mode ${newMode ? 'enabled' : 'disabled'}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary border-b border-primary-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="flex items-center gap-2 hover-elevate px-2 py-1 rounded-md">
                <div className="w-8 h-8 bg-primary-foreground rounded-md flex items-center justify-center">
                  <span className="font-display text-xl font-bold text-primary">C</span>
                </div>
                <span className="font-display text-xl font-bold text-primary-foreground hidden sm:inline">
                  CricketLive
                </span>
              </a>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <a
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      location === link.path
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'text-primary-foreground/80 hover-elevate'
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleDarkMode}
              className="text-primary-foreground hover:bg-primary-foreground/20"
              data-testid="button-theme-toggle"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              data-testid="button-user-menu"
            >
              <User className="h-5 w-5" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a
                  className={`block px-4 py-2 rounded-md text-sm font-medium ${
                    location === link.path
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'text-primary-foreground/80'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
