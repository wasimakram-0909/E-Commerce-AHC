
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems } = useCart();
  const [loading, setLoading] = useState(true);

  // Simulate API loading
  setTimeout(() => setLoading(false), 1000);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCard key={index} product={{} as Product} loading={true} />
            ))}
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral text-lg mb-4">Your wishlist is empty</p>
            <Link to="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
