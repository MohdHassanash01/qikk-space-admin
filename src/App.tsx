import { lazy, memo, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";
import { ToastContainer } from 'react-toastify';
import { SidebarProvider } from "./components/ui/sidebar";
import { ThemeProvider } from "./components/theme-provider";
import { AppSidebar } from "./components/app-sidebar";


// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PortfolioAdminPage = lazy(() => import("./pages/PortfolioAdminPage"))
const Signup  = lazy(() => import("./pages/Signup"))
const Signin = lazy(() => import("./pages/Signin"))

// Memoized App component to prevent unnecessary re-renders
const App = memo(() => (
  <ErrorBoundary>
  <BrowserRouter>
             
  <SidebarProvider>

      <Suspense fallback={<PageLoader />}>

      <Routes>

      <Route  path="/signin" element={<Signin/>}/>
      <Route  path="/signup" element={<Signup/>}/>

      <Route path="/" element={<Layout/>}>

      <Route path="/" element={<HomePage />} />
      <Route path="/portfolio" element={<PortfolioAdminPage />} />

      <Route path="*" element={<NotFound />} />

</Route>

      </Routes>
      </Suspense>

  </SidebarProvider>

                 <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
            </BrowserRouter>
  </ErrorBoundary>
));

export default App;


function Layout(){

  return <>
  
  <ThemeProvider  defaultTheme="dark" storageKey="vite-ui-theme">

<SidebarProvider>

  <AppSidebar />
      <main className="w-full">
         <Navbar/>
        <div className="px-4">
          {<Outlet/>}
        </div>



      </main>

</SidebarProvider>

  </ThemeProvider>


  
  </>

}