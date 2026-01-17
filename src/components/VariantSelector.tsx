import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShopifyProduct, ShopifyVariant } from "@/types/shopify";
import { motion, AnimatePresence } from "framer-motion";

interface VariantSelectorProps {
  product: ShopifyProduct;
  selectedVariant: ShopifyVariant | null;
  onVariantChange: (variant: ShopifyVariant) => void;
  className?: string;
}

const KARAT_OPTIONS = ['14K', '18K'] as const;
type KaratOption = typeof KARAT_OPTIONS[number];

export const VariantSelector = ({
  product,
  selectedVariant,
  onVariantChange,
  className = ""
}: VariantSelectorProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedKarat, setSelectedKarat] = useState<KaratOption>('14K');

  // Initialize selected options from selected variant
  useEffect(() => {
    if (selectedVariant) {
      const options: Record<string, string> = {};
      selectedVariant.selectedOptions.forEach(option => {
        options[option.name] = option.value;
      });
      setSelectedOptions(options);
    }
  }, [selectedVariant]);

  // Find matching variant when options change
  useEffect(() => {
    const matchingVariant = product.variants.edges.find(({ node }) =>
      node.selectedOptions.every(option =>
        selectedOptions[option.name] === option.value
      )
    )?.node;

    if (matchingVariant && matchingVariant.id !== selectedVariant?.id) {
      onVariantChange(matchingVariant);
    }
  }, [selectedOptions, product.variants.edges, selectedVariant, onVariantChange]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  // Check if an option combination is available
  const isOptionAvailable = (optionName: string, value: string): boolean => {
    const testOptions = { ...selectedOptions, [optionName]: value };
    
    return product.variants.edges.some(({ node }) =>
      node.availableForSale &&
      node.selectedOptions.every(option =>
        testOptions[option.name] === option.value
      )
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {product.options.map((option) => (
        <motion.div
          key={option.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              {option.name.toLowerCase() === 'size' ? 'Total Carat Weight:' : option.name}
            </label>
            {selectedOptions[option.name] && (
              <Badge variant="secondary" className="text-xs">
                {selectedOptions[option.name]}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <AnimatePresence mode="wait">
              {option.values.map((value) => {
                const isSelected = selectedOptions[option.name] === value;
                const isAvailable = isOptionAvailable(option.name, value);
                const isMaterialOption = option.name.toLowerCase() === 'material';
                const displayValue = isMaterialOption ? `${selectedKarat} ${value}` : value;
                
                return (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: isAvailable ? 1.02 : 1 }}
                    whileTap={{ scale: isAvailable ? 0.98 : 1 }}
                  >
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      className={`
                        relative transition-all duration-200
                        ${isSelected ? "btn-hero" : "btn-ghost-luxury"}
                        ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                      `}
                      onClick={() => isAvailable && handleOptionChange(option.name, value)}
                      disabled={!isAvailable}
                    >
                      {displayValue}
                      
                      {/* Out of stock indicator */}
                      {!isAvailable && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                          <span className="text-xs text-muted-foreground">Out of Stock</span>
                        </div>
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Karat Selector - appears after Material option */}
          {option.name.toLowerCase() === 'material' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 pt-3 border-t border-border/50"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Gold Karat:</span>
                <div className="flex gap-2">
                  {KARAT_OPTIONS.map((karat) => {
                    const isSelected = selectedKarat === karat;
                    return (
                      <motion.div key={karat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className={`
                            text-xs px-3 py-1 h-7 transition-all duration-200
                            ${isSelected ? "btn-hero" : "btn-ghost-luxury"}
                          `}
                          onClick={() => setSelectedKarat(karat)}
                        >
                          {karat}
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}

    </div>
  );
};