import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniCart } from "@/components/MiniCart";
import { useCartActions } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import nooriLogo from "@/assets/noori-logo.png";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const { cart, isCartOpen, openCart, closeCart } = useCartActions();
  const shopDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close shop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(event.target as Node)) {
        setIsShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "About", href: "/policies" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/why-noori" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50",
          "max-w-[1100px] w-[calc(100%-2rem)] md:w-[calc(100%-4rem)]",
          "bg-[rgba(10,10,10,0.78)] backdrop-blur-[12px]",
          "border border-white/[0.08] rounded-[18px]",
          "transition-all duration-300",
          isScrolled && "bg-[rgba(10,10,10,0.88)] top-2"
        )}
      >
        <div className="flex items-center justify-between px-5 md:px-7 py-3 md:py-3.5">
          {/* Logo - Left */}
          <Link to="/" className="relative z-10 flex-shrink-0">
            <img src={nooriLogo} alt="Noori" className="h-8 md:h-9 w-auto brightness-0 invert" />
          </Link>

          {/* Desktop Navigation - Absolute Center */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {/* Shop with Dropdown */}
            <div ref={shopDropdownRef} className="relative">
              <button
                onClick={() => setIsShopOpen(!isShopOpen)}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  "text-white/80 hover:text-[hsl(45,70%,50%)]",
                  isShopOpen && "text-[hsl(45,70%,50%)]"
                )}
              >
                Shop
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 transition-transform duration-200",
                  isShopOpen && "rotate-180"
                )} />
              </button>
              
              {/* Dropdown Menu */}
              {isShopOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[320px] bg-[rgba(10,10,10,0.95)] backdrop-blur-[14px] border border-white/[0.08] rounded-2xl p-5 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Column A */}
                    <div className="space-y-3">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Categories</p>
                      <Link 
                        to="/collections/solitaires" 
                        onClick={() => setIsShopOpen(false)}
                        className="block text-sm text-white/80 hover:text-[hsl(45,70%,50%)] transition-colors"
                      >
                        Studs
                      </Link>
                      <Link 
                        to="/collections/solitaires" 
                        onClick={() => setIsShopOpen(false)}
                        className="block text-sm text-white/80 hover:text-[hsl(45,70%,50%)] transition-colors"
                      >
                        Necklaces
                      </Link>
                      <Link 
                        to="/collections/solitaires" 
                        onClick={() => setIsShopOpen(false)}
                        className="block text-sm text-white/80 hover:text-[hsl(45,70%,50%)] transition-colors"
                      >
                        Bracelets
                      </Link>
                    </div>
                    {/* Column B */}
                    <div className="space-y-3">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Featured</p>
                      <Link 
                        to="/collections/solitaires" 
                        onClick={() => setIsShopOpen(false)}
                        className="block text-sm text-white/80 hover:text-[hsl(45,70%,50%)] transition-colors"
                      >
                        Best Sellers
                      </Link>
                      <Link 
                        to="/#product-3d-carousel" 
                        onClick={() => setIsShopOpen(false)}
                        className="block text-sm text-white/80 hover:text-[hsl(45,70%,50%)] transition-colors"
                      >
                        3D Gallery
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-white/80 hover:text-[hsl(45,70%,50%)] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[hsl(45,70%,50%)] after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu - Right */}
          <div className="flex items-center gap-3 relative z-10">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              onClick={openCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {cart && cart.totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-[hsl(45,70%,50%)] text-[hsl(220,30%,5%)] text-[10px] rounded-full flex items-center justify-center font-medium">
                  {cart.totalQuantity}
                </span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-5 pb-5 border-t border-white/[0.08] mt-1 pt-4">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/collections/solitaires"
                className="text-base font-medium py-2 text-white/80 hover:text-[hsl(45,70%,50%)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-base font-medium py-2 text-white/80 hover:text-[hsl(45,70%,50%)] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Mini Cart */}
      <MiniCart isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};
