import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniCart } from "@/components/MiniCart";
import { useCartActions } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, isCartOpen, openCart, closeCart } = useCartActions();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const collectionItems = [
    { name: "Earrings", href: "/collections/earrings" },
    { name: "Necklaces", href: "/collections/necklaces" },
    { name: "Bracelets", href: "/collections/bracelets" },
  ];

  const navItems = [
    { name: "About", href: "/policies" },
    { name: "Impact", href: "#impact" },
    { name: "Journal", href: "#journal" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border/50" : "bg-transparent"
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="font-display text-2xl md:text-3xl font-normal tracking-wide">
                <span className="noor-glow">Noori</span>
              </h1>
            </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    Collections
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      {collectionItems.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent"
                            >
                              <div className="text-sm font-medium leading-none">{item.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {navItems.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium transition-colors hover:text-accent relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-accent relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </a>
              )
            ))}
          </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
                <ShoppingBag className="h-5 w-5" />
                {cart && cart.totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                    {cart.totalQuantity}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/50">
              <nav className="flex flex-col space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Collections</div>
                  {collectionItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-sm font-medium py-2 pl-4 block transition-colors hover:text-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                {navItems.map((item) => (
                  item.href.startsWith('/') ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-sm font-medium py-2 transition-colors hover:text-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium py-2 transition-colors hover:text-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  )
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Mini Cart */}
      <MiniCart isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};