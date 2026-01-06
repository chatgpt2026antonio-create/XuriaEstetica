import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Stock {
  S: number;
  M: number;
  L: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: Stock;
}

interface ProductCardProps {
  product: Product;
  onPurchase: (productId: number, size: keyof Stock) => void;
}

const ProductCard = ({ product, onPurchase }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState<keyof Stock | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const sizes: (keyof Stock)[] = ["S", "M", "L"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Por favor selecciona una talla");
      return;
    }
    
    if (product.stock[selectedSize] <= 0) {
      toast.error("Producto agotado en esta talla");
      return;
    }

    onPurchase(product.id, selectedSize);
    toast.success(`${product.name} (Talla ${selectedSize}) añadido al carrito`);
  };

  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-4">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        
        {/* Quick View Overlay */}
        <div className={`absolute inset-0 bg-foreground/10 flex items-end justify-center pb-6 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <Button
            variant="secondary"
            className="tracking-widest uppercase text-xs"
            onClick={handleAddToCart}
          >
            Añadir al Carrito
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium tracking-wide">{product.name}</h3>
          <span className="text-sm">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        {/* Size Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">Talla:</span>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                disabled={product.stock[size] <= 0}
                className={`w-10 h-10 text-xs border transition-all duration-200 ${
                  selectedSize === size
                    ? "bg-foreground text-background border-foreground"
                    : product.stock[size] > 0
                    ? "border-border hover:border-foreground"
                    : "border-border text-muted-foreground/50 line-through cursor-not-allowed"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Stock Indicator */}
        <div className="flex gap-4 text-xs text-muted-foreground">
          {sizes.map((size) => (
            <span key={size} className={product.stock[size] <= 3 && product.stock[size] > 0 ? "text-accent" : ""}>
              {size}: {product.stock[size] > 0 ? `${product.stock[size]} disponibles` : "Agotado"}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
