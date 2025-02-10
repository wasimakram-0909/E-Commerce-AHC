import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps {
  product: Product;
  loading?: boolean;
}

const ProductCard = ({ product, loading = false }: ProductCardProps) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "SAR",
      currencyDisplay: "code",
    }).format(price).replace("SAR", "SAR");
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1500);
  };

  if (loading) {
    return (
      <div className="glass rounded-lg overflow-hidden hover-lift">
        <Skeleton className="w-full h-48" />
        <div className="p-4 space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-lg overflow-hidden hover-lift">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 hover:bg-white/50"
          onClick={handleWishlist}
        >
          <Heart
            className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-neutral mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <Button 
            variant={isInCart(product.id) ? "secondary" : "default"}
            className="hover-lift"
            onClick={handleAddToCart}
            disabled={isAdding || isInCart(product.id)}
          >
            {isInCart(product.id) ? "Added to Cart" : isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
