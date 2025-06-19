// User and Auth Types
export interface User {
  id: string;
  email?: string;
  full_name?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
}

// Trip Planning Types
export interface TripFormData {
  origin: string;
  destination: string;
  budget: number;
  days: number;
  people: number;
  preferences: string[];
  dietaryRestrictions: string[];
  startDate?: string;
  endDate?: string;
}

export interface TripPreferences {
  adventure: boolean;
  culture: boolean;
  relaxation: boolean;
  food: boolean;
  nightlife: boolean;
  nature: boolean;
  shopping: boolean;
  history: boolean;
}

export interface DietaryRestrictions {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  halal: boolean;
  kosher: boolean;
  none: boolean;
}

// Package and Offer Types
export interface TravelPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: number;
  destination: string;
  image: string;
  rating: number;
  reviews: number;
  includes: string[];
  highlights: string[];
  category: 'budget' | 'standard' | 'premium' | 'luxury';
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  packageId: string;
  image: string;
}

// Itinerary Types
export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
  accommodation?: Accommodation;
  meals: Meal[];
  transportation?: Transportation;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  duration: number;
  cost: number;
  category: 'attraction' | 'restaurant' | 'shopping' | 'entertainment';
  time: string;
  image?: string;
  rating?: number;
  tips?: string[];
}

export interface Accommodation {
  id: string;
  name: string;
  type: 'hotel' | 'hostel' | 'apartment' | 'resort';
  address: string;
  rating: number;
  price: number;
  amenities: string[];
  image: string;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  restaurant: string;
  location: string;
  cost: number;
  time: string;
  dietaryOptions: string[];
}

export interface Transportation {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'car' | 'walking';
  from: string;
  to: string;
  departure: string;
  arrival: string;
  cost: number;
  provider?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface TripGenerationResponse {
  tripId: string;
  itinerary: ItineraryDay[];
  summary: TripSummary;
  packages: TravelPackage[];
  estimatedCost: number;
}

export interface TripSummary {
  destination: string;
  duration: number;
  totalCost: number;
  highlights: string[];
  recommendations: string[];
}

// UI Component Types
export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

export interface ToastMessage {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
}

// Navigation Types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  children?: NavigationItem[];
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio' | 'date';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Constants
export const TRIP_PREFERENCES = {
  adventure: 'Aventura',
  culture: 'Cultura',
  relaxation: 'Relaxamento',
  food: 'Gastronomia',
  nightlife: 'Vida noturna',
  nature: 'Natureza',
  shopping: 'Compras',
  history: 'História'
} as const;

export const DIETARY_RESTRICTIONS = {
  vegetarian: 'Vegetariano',
  vegan: 'Vegano',
  glutenFree: 'Sem glúten',
  dairyFree: 'Sem lactose',
  halal: 'Halal',
  kosher: 'Kosher',
  none: 'Nenhuma restrição'
} as const;

export const PACKAGE_CATEGORIES = {
  budget: 'Econômico',
  standard: 'Padrão',
  premium: 'Premium',
  luxury: 'Luxo'
} as const; 