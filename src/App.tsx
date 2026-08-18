import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index.tsx";
import ProductShowcasePage from "./pages/Products.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Main Website Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductShowcasePage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              {/* 404 Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
