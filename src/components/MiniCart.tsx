import { useState } from "react";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCartActions } from "@/hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { klaviyoStartedCheckout } from "@/lib/klaviyo-tracking";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MiniCart = ({ isOpen, onClose }: MiniCartProps) => {
  const { cart, isLoading, updateCartLine, removeFromCart } = useCartActions();
  const [discountCode, setDiscountCode] = useState("");

  const freeShippingThreshold = 150; // CAD
  const currentTotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0;
  const freeShippingProgress = Math.min((currentTotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - currentTotal, 0);

  const handleQuantityChange = async (lineId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      await removeFromCart(lineId);
    } else {
      await updateCartLine(lineId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!cart?.checkoutUrl) return;

    // Fire Klaviyo "Started Checkout" — triggers Abandoned Cart flow
    // and gives the item list for email personalization
    const items = cart.lines.edges.map(({ node }) => ({
      productId: node.merchandise.product.id,
      title: node.merchandise.product.title,
      handle: node.merchandise.product.handle,
      price: node.cost.totalAmount.amount,
      quantity: node.quantity,
      image: node.merchandise.image?.url,
    }));
    klaviyoStartedCheckout({
      cartTotalValue: parseFloat(cart.cost.totalAmount.amount),
      itemNames: items.map((i) => i.title),
      checkoutUrl: cart.checkoutUrl,
      items,
    });

    // GA4 + Meta Pixel begin_checkout / InitiateCheckout
    const value = parseFloat(cart.cost.totalAmount.amount);
    const currency = cart.cost.totalAmount.currencyCode;
    window.gtag?.("event", "begin_checkout", {
      currency,
      value,
      items: items.map((i) => ({
        item_id: i.productId,
        item_name: i.title,
        price: parseFloat(i.price),
        quantity: i.quantity,
      })),
    });
    window.fbq?.("track", "InitiateCheckout", {
      content_ids: items.map((i) => i.productId),
      content_type: "product",
      num_items: cart.totalQuantity,
      value,
      currency,
    });
    window.ttq?.track("InitiateCheckout", {
      contents: items.map((i) => ({
        content_id: i.productId,
        content_name: i.title,
        content_type: "product",
        quantity: i.quantity,
        price: parseFloat(i.price),
      })),
      value,
      currency,
    });

    window.open(cart.checkoutUrl, "_blank");
  };

  const cartLines = cart?.lines.edges || [];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-2xl">
              Your Cart
            </SheetTitle>
            <Badge variant="secondary" className="text-xs">
              {cart?.totalQuantity || 0} items
            </Badge>
          </div>
        </SheetHeader>

        {/* Cart Content */}
        <div className="flex-1 overflow-auto py-4">
          <AnimatePresence mode="wait">
            {cartLines.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Discover our capsule collection of modern heirlooms
                </p>
                <Button onClick={onClose} className="btn-hero">
                  Continue Shopping
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {/* Free Shipping Progress */}
                {remainingForFreeShipping > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-gradient-noor p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">
                        CAD ${remainingForFreeShipping.toFixed(2)} away from free shipping
                      </span>
                    </div>
                    <Progress value={freeShippingProgress} className="h-2" />
                  </motion.div>
                )}

                {/* Cart Items */}
                <AnimatePresence>
                  {cartLines.map(({ node: line }) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="card-luxury p-4"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-muted/20 rounded-lg overflow-hidden flex-shrink-0">
                          {line.merchandise.image && (
                            <img
                              src={line.merchandise.image.url}
                              alt={line.merchandise.image.altText}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1 truncate">
                            {line.merchandise.product.title}
                          </h4>
                          <div className="text-xs text-muted-foreground mb-2">
                            {line.merchandise.selectedOptions.map((option, index) => (
                              <span key={option.name}>
                                {option.value}
                                {index < line.merchandise.selectedOptions.length - 1 && " • "}
                              </span>
                            ))}
                          </div>
                          
                          {/* Quantity & Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleQuantityChange(line.id, line.quantity - 1)}
                                disabled={isLoading}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {line.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleQuantityChange(line.id, line.quantity + 1)}
                                disabled={isLoading}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-sm font-medium text-accent">
                                CAD ${line.cost.totalAmount.amount}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Discount Code */}
                <div className="border-t border-border pt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-background"
                    />
                    <Button variant="outline" size="sm" disabled={!discountCode}>
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Cart Footer */}
        {cartLines.length > 0 && (
          <div className="border-t border-border pt-4 space-y-4">
            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>CAD ${cart?.cost.subtotalAmount.amount}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>{currentTotal >= freeShippingThreshold ? "Free" : "Calculated at checkout"}</span>
              </div>
              <div className="flex justify-between font-medium text-lg border-t border-border pt-2">
                <span>Total</span>
                <span className="text-accent">CAD ${cart?.cost.totalAmount.amount}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              className="w-full btn-hero group"
              disabled={isLoading}
            >
              Secure Checkout
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            {/* Trust Indicators */}
            <div className="text-center text-xs text-muted-foreground">
              <p>Secure checkout • Free shipping over CAD $150 • 30-day returns</p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};