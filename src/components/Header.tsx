import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import icon512 from "@/assets/icon512.png";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", label: "Sākums", icon: "🏠" },
    { path: "/demo", label: "Demo", icon: "🎬" },
    { path: "/documentation", label: "Dokumentācija", icon: "📖" },
    { path: "/support", label: "Atbalsts", icon: "💬" }
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src={icon512} 
            alt="White Rabbit" 
            className="w-10 h-10 rounded-lg shadow-md"
          />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              White Rabbit
            </h1>
            <p className="text-xs text-muted-foreground">Feed & Follow</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                className="flex items-center gap-2"
              >
                <span>{item.icon}</span>
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <details className="relative">
            <summary className="list-none">
              <Button variant="outline" size="sm">
                ☰ Izvēlne
              </Button>
            </summary>
            <div className="absolute right-0 top-full mt-2 w-48 bg-background border rounded-lg shadow-lg p-2 space-y-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="block">
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start gap-2"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </details>
        </div>

        {/* Status Badge */}
        <div className="hidden lg:block">
          <Badge variant="secondary" className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Chrome Extension
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default Header;