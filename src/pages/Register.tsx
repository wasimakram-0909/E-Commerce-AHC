import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { notifySuccess, notifyError } from "@/components/ToastProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const assessPasswordStrength = (password) => {
    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordStrength("Weak");
      return "Weak";
    }
    setPasswordStrength("Strong");
    return "Strong";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    assessPasswordStrength(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (passwordStrength === "Weak") {
      setPasswordError("Password must be at least 8 characters long and contain numbers and special characters.");
      return;
    }

    setIsLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: name.split(" ")[0],
            last_name: name.split(" ").slice(1).join(" "),
          },
        },
      });

      if (signUpError) {
        if (signUpError.message === "User already registered") {
          notifyError("This email is already registered. Please try logging in instead.");
        } else {
          notifyError("Registration Failed");
        }
      } else {
        notifySuccess("Registration successful! Please Login");
        navigate("/login");
      }
    } catch (error) {
      notifyError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength === "Weak") return "border-red-500 text-red-500";
    if (strength === "Strong") return "border-green-500 text-green-500";
    return "";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="glass w-full max-w-md p-8 rounded-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">Create Account</h1>
          <p className="text-neutral">Join our marketplace today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-md border border-input bg-background"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                onChange={handlePasswordChange}
                className={`w-full p-2 rounded-md border ${getPasswordStrengthColor(passwordStrength)} bg-background`}
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
            {passwordStrength === "Weak" && (
              <p className="text-red-500 text-sm mt-1">Password must be at least 8 characters long and contain numbers and special characters.</p>
            )}
            {passwordStrength === "Strong" && (
              <p className="text-green-500 text-sm mt-1">Strong password</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-neutral">Already have an account? </span>
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
