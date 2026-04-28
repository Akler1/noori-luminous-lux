import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShopifyProduct, ShopifyVariant } from "@/types/shopify";
import { motion, AnimatePresence } from "framer-motion";
import metalGold from '@/assets/metal-gold-96.webp';
import metalSilver from '@/assets/metal-silver-96.webp';
import metalRose from '@/assets/metal-rose-96.webp';

interface VariantSelectorProps {
  product: ShopifyProduct;
  selectedVariant: ShopifyVariant | null;
  onVariantChange: (variant: ShopifyVariant) => void;
  className?: string;
}

const METAL_IMAGES: Record<string, string> = {
  'Yellow Gold': metalGold,
  'White Gold': metalSilver,
  'Rose Gold': metalRose,
};

export const VariantSelector = ({
  product,
  selectedVariant,
  onVariantChange,
  className = ""
}: VariantSelectorProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

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
      {product.options.map((option) => {
        const isMetalOption = option.name.toLowerCase() === 'metal';
        const isKaratOption = option.name.toLowerCase() === 'karat';

        return (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                {option.name.toLowerCase() === 'size' ? 'Total Carat Weight' : option.name}
              </label>
              {selectedOptions[option.name] && (
                <Badge variant="secondary" className="text-xs">
                  {selectedOptions[option.name]}
                </Badge>
              )}
            </div>

            {/* Karat toggle — pill style */}
            {isKaratOption ? (
              <div className="inline-flex rounded-full border border-border p-0.5 bg-muted/30">
                {option.values.map((value) => {
                  const isSelected = selectedOptions[option.name] === value;
                  return (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(option.name, value)}
                      className={`
                        px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                        ${isSelected
                          ? "bg-accent text-white shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Metal & Size options — buttons with color dots */
              <div className="flex flex-wrap gap-2">
                <AnimatePresence mode="wait">
                  {option.values.map((value) => {
                    const isSelected = selectedOptions[option.name] === value;
                    const isAvailable = isOptionAvailable(option.name, value);
                    const metalImg = isMetalOption ? METAL_IMAGES[value] : null;

                    return (
                      <motion.div
                        key={value}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          className={`
                            relative transition-all duration-200
                            ${isSelected ? "btn-hero" : "btn-ghost-luxury"}
                          `}
                          onClick={() => handleOptionChange(option.name, value)}
                        >
                          {metalImg && (
                            <img src={metalImg} alt="" className="w-4 h-4 rounded-full object-cover inline-block mr-2 shrink-0" />
                          )}
                          {value}
                        </Button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
