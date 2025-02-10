
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { notifyError } from "@/components/ToastProvider"; 
import perfumes from "../assets/perfumes_img.jpeg";
import homeDecore from "../assets/home_decore.jpeg";
import fashion from "../assets/fashion.jpeg";
import kitchen from "../assets/kitchen.jpeg";
import accessories from "../assets/accessories.jpeg";
import food from "../assets/food.jpeg";
import art from "../assets/art.jpeg";


interface CategoryData {
  name: string;
  image: string;
  description: string;
  productCount: number;
}

const CategorySkeleton = () => (
  <div className="relative overflow-hidden rounded-lg">
    <Skeleton className="aspect-[16/9] w-full" />
    <div className="absolute inset-0 p-6 flex flex-col justify-end">
      <Skeleton className="h-8 w-1/3 mb-2" />
      <Skeleton className="h-4 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  </div>
);

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryData[]>([]);

  // Mapping categories description
  const categoryDescriptions: { [key: string]: string } = {
    "Perfumes": "Discover luxurious Arabian fragrances",
    "Home Decor": "Traditional and modern Arabian home decoration",
    "Fashion": "Traditional and modern Arabian fashion",
    "Kitchen": "Traditional Arabic kitchen essentials",
    "Accessories": "Complete your look with Arabian accessories",
    "Food": "Traditional Arabian delicacies",
    "Art": "Beautiful Arabic and Islamic art pieces"
  };

  // Mapping images for categories
  const categoryImages: { [key: string]: string } = {
    "Perfumes": perfumes,
    "Home Decor": homeDecore,
    "Fashion": fashion,
    "Kitchen": kitchen,
    "Accessories": accessories,
    "Food": food,
    "Art": art
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('category')
        .not('category', 'is', null);

      if (error) {
        notifyError("Failed to fetch categories");
        return;
      }

      // Count products per category
      const categoryCounts: { [key: string]: number } = {};
      data.forEach(item => {
        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
      });

      // Transform into CategoryData array
      const categoryData: CategoryData[] = Object.entries(categoryCounts).map(([name, count]) => ({
        name,
        image: categoryImages[name] || art,
        description: categoryDescriptions[name] || `Explore our ${name} collection`,
        productCount: count
      }));

      setCategories(categoryData);
    } catch (error) {
      notifyError("Failed to fetch categories")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto pt-24 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Browse Categories</h1>
          <p className="text-neutral text-lg">
            Explore our curated collection of authentic Arabian products
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))
            : categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/products?category=${category.name}`}
                  className="group relative overflow-hidden rounded-lg hover-lift"
                >
                  <div className="aspect-[16/9]">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 p-6 flex flex-col justify-end">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/80 mb-2">
                        {category.description}
                      </p>
                      <span className="text-white/60 text-sm">
                        {category.productCount} Products
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </main>
    </div>
  );
};

export default Categories;
