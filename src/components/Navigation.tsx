
import { useState, useEffect } from "react";
import { ShoppingCart, Heart, LogIn, LogOut, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { notifySuccess, notifyError } from "@/components/ToastProvider"; 


const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const location = useLocation();
  const { cartItems, wishlistItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // this is to get initial session 
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // this is to check for authentication. 
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      notifyError("Failed to log out. Please try again.")
    } else {
      navigate("/login");
      localStorage.removeItem("token");
      notifySuccess("You have been logged out successfully.")
    }
  };

  return (
    <nav className="glass fixed w-full z-50 px-2 py-3">
      <div className="container mx-auto flex items-center justify-between px-0 sm:px-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
          <Link to="/home" className="text-2xl font-bold text-primary">Store</Link>
        </div>

        <div className={`${isMenuOpen 
          ? 'absolute top-full left-0 right-0 bg-white shadow-lg p-4 lg:p-0 lg:shadow-none' 
          : 'hidden'} lg:flex lg:static lg:bg-transparent items-center space-y-2 lg:space-y-0 lg:space-x-8`}>
          <Link to="/home" className="block lg:inline">
            <Button 
              variant={isActive("/home") ? "default" : "ghost"} 
              className="w-full lg:w-auto hover-lift"
            >
              Home
            </Button>
          </Link>
          <Link to="/products" className="block lg:inline">
            <Button 
              variant={isActive("/products") ? "default" : "ghost"} 
              className="w-full lg:w-auto hover-lift"
            >
              Products
            </Button>
          </Link>
          <Link to="/categories" className="block lg:inline">
            <Button 
              variant={isActive("/categories") ? "default" : "ghost"} 
              className="w-full lg:w-auto hover-lift"
            >
              Categories
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="hover-lift">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/wishlist" className="relative">
            <Button variant="ghost" size="icon" className="hover-lift">
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Button>
          </Link>
          {session ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hover-lift">
                  <LogOut className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will need to login again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon" className="hover-lift">
                <LogIn className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
