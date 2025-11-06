import { Link, useNavigate } from "react-router-dom";

import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import { useFirebase } from "@/context/Firebase";


export default function Signup() {
 
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

     const {signupUserWithEmailAndPassword, 
      signinWithGoogle,
      isloggedIn
     } = useFirebase()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    // Validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

       const user = await signupUserWithEmailAndPassword(email,password)

      if (user) {
        toast.success("Sign Up successfully ");
        navigate("/")
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "An error occurred during sign up");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

        if (isloggedIn) {
            navigate("/")
        }

    },[navigate,isloggedIn])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center absolute">
      <Link
        to={"/"}
        className="fixed top-10 left-10 text-white px-3 py-1 border-1 border-slate-1000 rounded-lg hover:bg-slate-1000 flex gap-2 items-center"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <Card className="dark w-full max-w-sm relative">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Signup to your account</CardTitle>
          <CardAction>
            <Button variant="link">
              <Link to={"/signin"}>Sign in</Link>
            </Button>
          </CardAction>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="mb-2 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  autoComplete="off"
                  ref={emailRef}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <>
                        <EyeOff size={16} /> Hide
                      </>
                    ) : (
                      <>
                        <Eye size={16} /> Show
                      </>
                    )}
                  </button>
                </div>
                
                <Input
                  autoComplete="off"
                  ref={passwordRef}
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  autoComplete="off"
                  ref={confirmPasswordRef}
                  name="confirmPassword"
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={loading}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Signup"}
              </Button>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex-col gap-2">
          <Button 
          onClick={signinWithGoogle}
            variant="outline" 
            className="w-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
            disabled={loading}
          >
            Sign up with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}