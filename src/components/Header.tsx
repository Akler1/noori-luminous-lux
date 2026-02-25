import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniCart } from "@/components/MiniCart";
import { useCartActions } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import nooriLogo from "@/assets/noori-logo-new.png";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = useState(false);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const { cart, isCartOpen, openCart, closeCart } = useCartActions();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (collectionsRef.current && !collectionsRef.current.contains(e.target as Node)) {
        setIsCollectionsOpen(false);
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
      {/* No spacer - nav floats over hero */}
      <header
        className={cn(
          "fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-[1200px] md:w-[calc(100%-128px)] z-50",
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
            isScrolled ? "h-[60px] md:h-[70px]" : "h-[70px] md:h-20"
          )}
        >
          {/* Logo - Left */}
          <Link to="/" className="relative z-10 flex-shrink-0">
            <img
              src={nooriLogo}
              alt="Noori"
              className={cn(
                "w-auto transition-all duration-300",
                isScrolled ? "h-9 md:h-10" : "h-11 md:h-12"
              )}
            />
          </Link>

          {/* Desktop Navigation - Absolute Center */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            <div ref={collectionsRef} className="relative">
              <button
                onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-accent transition-colors"
              >
                Collections
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", isCollectionsOpen && "rotate-180")} />
              </button>
              {isCollectionsOpen && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#111111]/95 backdrop-blur-xl border border-white/[0.1] rounded-xl shadow-lg shadow-black/20 min-w-[180px] py-2 px-1 z-[60]">
                  <Link
                    to="/collections/solitaires"
                    onClick={() => setIsCollectionsOpen(false)}
                    className="block px-4 py-2 text-sm text-white/80 hover:text-accent hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Solitaires
                  </Link>
                </div>
              )}
            </div>

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
              <div>
                <button
                  onClick={() => setIsMobileCollectionsOpen(!isMobileCollectionsOpen)}
                  className="flex items-center justify-between w-full text-base font-medium py-2 text-white/80 hover:text-accent transition-colors"
                >
                  Collections
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isMobileCollectionsOpen && "rotate-180")} />
                </button>
                {isMobileCollectionsOpen && (
                  <Link
                    to="/collections/solitaires"
                    className="block pl-4 py-2 text-sm text-white/60 hover:text-accent transition-colors"
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileCollectionsOpen(false); }}
                  >
                    Solitaires
                  </Link>
                )}
              </div>
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
