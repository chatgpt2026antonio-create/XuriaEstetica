import { useState } from "react";
import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

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

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Faja Body Sculpt",
    price: 89.99,
    image: product1,
    description: "Body moldeador de alta compresión. Ideal para uso diario, ofrece soporte y comodidad excepcional.",
    stock: { S: 5, M: 8, L: 3 },
  },
  {
    id: 2,
    name: "Faja Short Control",
    price: 69.99,
    image: product2,
    description: "Short de compresión media. Perfecto para moldear caderas y muslos con máxima comodidad.",
    stock: { S: 10, M: 6, L: 0 },
  },
  {
    id: 3,
    name: "Faja Cinturilla Premium",
    price: 79.99,
    image: product3,
    description: "Cinturilla reductora con diseño elegante. Tecnología de compresión gradual para máximo confort.",
    stock: { S: 2, M: 7, L: 5 },
  },
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handlePurchase = (productId: number, size: keyof Stock) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              stock: {
                ...product.stock,
                [size]: Math.max(0, product.stock[size] - 1),
              },
            }
          : product
      )
    );
  };

  return (
    <section id="productos" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Colección
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Nuestras Fajas
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Descubre nuestra selección de fajas premium, diseñadas para realzar tu silueta con elegancia y comodidad.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
