import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { notifySuccess, notifyError } from "@/components/ToastProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  // Function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Funtion to handle email change and validation 
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // stopping login on error ..
    if (emailError) {
      return;
    }

    setIsLoading(true);

    // login api with email and password
    try {
      const { error, data} = await supabase.auth.signInWithPassword({
        email,
        password,
      });      

      if (error) {
        notifyError(`Login Failed: ${error.message}`);
      } else {
        notifySuccess("You have successfully logged in");
        localStorage.setItem("token",data?.session?.access_token);

        // redirecting home page after successful login
        navigate("/home");
      }
    } catch (error) {
      notifyError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="glass w-full max-w-md p-8 rounded-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-neutral">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full p-2 rounded-md border ${
                emailError ? "border-red-500" : "border-input"
              } bg-background`}
              required
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-md border border-input bg-background"
              required
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-xl text-neutral"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              </div>
          </div>

          <div className="flex items-center justify-between">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-neutral">Don't have an account? </span>
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
