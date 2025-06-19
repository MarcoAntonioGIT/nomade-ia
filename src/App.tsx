import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ui/error-boundary";
import LoadingSpinner from "@/components/ui/loading-spinner";
import ProtectedRoute from "@/components/ProtectedRoute";

// Lazy load pages for better performance
const Index = React.lazy(() => import("./pages/Index"));
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const PlannerPage = React.lazy(() => import("./pages/PlannerPage"));
const SummaryPage = React.lazy(() => import("./pages/SummaryPage"));
const ItineraryPage = React.lazy(() => import("./pages/ItineraryPage"));
const OffersPage = React.lazy(() => import("./pages/OffersPage"));
const ResultPage = React.lazy(() => import("./pages/ResultPage"));
const MyTripsPage = React.lazy(() => import("./pages/MyTripsPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

// Loading fallback component
const PageLoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner 
      title="Carregando página"
      description="Aguarde um momento..."
    />
  </div>
);

// App component
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Suspense fallback={<PageLoadingFallback />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  
                  {/* Protected Routes */}
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
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
