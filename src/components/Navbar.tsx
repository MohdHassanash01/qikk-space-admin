import { Link, useNavigate } from "react-router-dom";

import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useFirebase } from "@/context/Firebase";

export default function Navbar() {
    const navigate = useNavigate();

     const {isloggedIn,logoutUser } = useFirebase()

  
  return (
    <div className="sticky top-0 z-50 w-full border-b border-neutral-600  backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="  flex items-center justify-between md:justify-end h-15  mx-5">

  <Link to="/" className="flex md:hidden">
    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(79,70,229,0.5)] ">Qikk Space</h3>
    </Link>


<div className="space-x-3 flex-shrink-0 ">

      <ModeToggle />

      


 {  isloggedIn ? <Button
        onClick={() => {
          logoutUser()
        navigate("/signin")
      }}
        className="bg-gradient-to-r from-blue-400 to-violet-600 py-2 px-3 rounded-md text-md text-white cursor-pointer">
          Logout
        </Button> :   
        
        <Button 
        onClick={() => navigate("/signin")}
        className="bg-gradient-to-r from-blue-400 to-violet-600 py-2 px-3 rounded-md text-md text-white cursor-pointer">
          Sign In
        </Button>}

</div>
  
      </div>
    </div>
  );
}