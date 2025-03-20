
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserCircle, Home, FileText, Gauge, Moon, Activity, Leaf, Wallet, Settings, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/reports", label: "Reports", icon: FileText },
    { path: "/body-metrics", label: "Body Metrics", icon: Gauge },
    { path: "/sleep", label: "Sleep", icon: Moon },
    { path: "/activity", label: "Activity", icon: Activity },
    { path: "/nutrition", label: "Nutrition", icon: Leaf },
    { path: "/risk-score", label: "Risk Score", icon: Activity },
    { path: "/wallet", label: "Wallet", icon: Wallet }
  ];

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="container flex items-center justify-between py-4 max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/765ffe1f-7f04-4b14-88a1-feb2561263a2.png" 
              alt="B-Well Logo" 
              className="h-8" 
            />
          </Link>
          
          <nav className="hidden md:flex space-x-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={cn(
                  "nav-link flex items-center gap-1", 
                  isActive(link.path) 
                    ? "text-wellness-bright-green after:bg-wellness-bright-green" 
                    : "text-gray-600 hover:text-wellness-bright-green"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button className="text-wellness-bright-green">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[350px] pt-12 bg-white">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive(link.path) 
                        ? "bg-wellness-light-green text-wellness-bright-green font-medium" 
                        : "text-gray-600 hover:bg-wellness-light-green hover:text-wellness-bright-green"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                ))}
                
                {/* Add Profile Link to mobile menu */}
                <Link
                  to="/profile"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive("/profile") 
                      ? "bg-wellness-light-green text-wellness-bright-green font-medium" 
                      : "text-gray-600 hover:bg-wellness-light-green hover:text-wellness-bright-green"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <UserCircle className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          {/* Profile button - only visible on desktop */}
          <button 
            className="hidden md:flex rounded-full bg-wellness-light-green p-2 hover:bg-wellness-green/20 transition-colors"
            onClick={() => navigate('/profile')}
          >
            <UserCircle className="h-6 w-6 text-wellness-bright-green" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
