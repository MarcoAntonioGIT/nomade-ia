
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import PlannerPage from "./pages/PlannerPage";
import SummaryPage from "./pages/SummaryPage";
import ItineraryPage from "./pages/ItineraryPage";
import OffersPage from "./pages/OffersPage";
import ResultPage from "./pages/ResultPage";
import MyTripsPage from "./pages/MyTripsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/planner" element={
              <ProtectedRoute>
                <PlannerPage />
              </ProtectedRoute>
            } />
            <Route path="/summary" element={
              <ProtectedRoute>
                <SummaryPage />
              </ProtectedRoute>
            } />
            <Route path="/itinerary" element={
              <ProtectedRoute>
                <ItineraryPage />
              </ProtectedRoute>
            } />
            <Route path="/offers" element={
              <ProtectedRoute>
                <OffersPage />
              </ProtectedRoute>
            } />
            <Route path="/result" element={
              <ProtectedRoute>
                <ResultPage />
              </ProtectedRoute>
            } />
            <Route path="/my-trips" element={
              <ProtectedRoute>
                <MyTripsPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
