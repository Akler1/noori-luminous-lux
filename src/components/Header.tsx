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
      {/* Spacer for fixed header */}
      <div className={cn("transition-all duration-300", isScrolled ? "h-[68px] md:h-[80px]" : "h-[80px] md:h-[88px]")} />
      <header
        className={cn(
          "fixed top-3 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-[1200px] md:w-[calc(100%-128px)] z-50",
          "bg-[#111111]/85 backdrop-blur-xl",
          "border border-white/[0.1]",
          "shadow-lg shadow-black/20",
          "transition-all duration-300",
          isMobileMenuOpen ? "rounded-2xl" : "rounded-full"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between max-w-[1280px] mx-auto",
            "px-6 md:px-8",
            "transition-all duration-300",
            isScrolled ? "h-12 md:h-14" : "h-14 md:h-16"
          )}
        >
          {/* Logo - Left */}
          <Link to="/" className="relative z-10 flex-shrink-0">
            <img
              src={nooriLogo}
              alt="Noori"
              className={cn(
                "w-auto transition-all duration-300",
                isScrolled ? "h-7 md:h-8" : "h-9 md:h-10"
              )}
            />
          </Link>

          {/* Desktop Navigation - Absolute Center */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {/* Shop with Dropdown */}
            <div ref={shopDropdownRef} className="relative">
              <button
                onClick={() => setIsShopOpen(!isShopOpen)}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  "text-white/80 hover:text-accent",
                  isShopOpen && "text-accent"
                )}
              >
                Shop
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    isShopOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Dropdown Menu */}
              {isShopOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[320px] bg-[rgba(10,10,10,0.95)] backdrop-blur-[14px] border border-white/[0.08] rounded-2xl p-5 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Column A */}
                    <div className="space-y-3">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-2">
                        Categories
                      </p>
                      <Link
                        to="/collections/solitaires"
                        onClick={() => setIsShopOpen(false)}
                        className="block text-sm text-white/80 hover:text-accent transition-colors"
                      >
                        Studs
                      </Link>
                      <Link
                        to="/collections/solitaires"
                        onClick={() => setIsShopOpen(false)}
                        className="block text-sm text-white/80 hover:text-accent transition-colors"
                      >
                        Necklaces
                      </Link>
                      <Link
                        to="/collections/solitaires"
                        onClick={() => setIsShopOpen(false)}
                        className="block text-sm text-white/80 hover:text-accent transition-colors"
                      >
                        Bracelets
                      </Link>
                    </div>
                    {/* Column B */}
                    <div className="space-y-3">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-2">
                        Featured
                      </p>
                      <Link
                        to="/collections/solitaires"
                        onClick={() => setIsShopOpen(false)}
                        className="block text-sm text-white/80 hover:text-accent transition-colors"
                      >
                        Best Sellers
                      </Link>
                      <Link
                        to="/#product-3d-carousel"
                        onClick={() => setIsShopOpen(false)}
                        className="block text-sm text-white/80 hover:text-accent transition-colors"
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
                className="text-sm font-medium text-white/80 hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
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
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-accent-foreground text-[10px] rounded-full flex items-center justify-center font-medium">
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
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-6 pb-5 border-t border-white/[0.08] mt-1 pt-4">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/collections/solitaires"
                className="text-base font-medium py-2 text-white/80 hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-base font-medium py-2 text-white/80 hover:text-accent transition-colors"
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
