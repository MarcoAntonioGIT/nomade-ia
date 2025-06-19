import { supabase } from '@/integrations/supabase/client';
import { 
  ApiResponse, 
  TripFormData, 
  TripGenerationResponse, 
  TravelPackage,
  AppError 
} from '@/types';
import { API_CONFIG, ERROR_MESSAGES, STORAGE_KEYS } from '@/config/constants';

class ApiService {
  private async getAuthHeaders(): Promise<Record<string, string>> {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No authentication token available');
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
      let errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;
      
      if (response.status === 401) {
        errorMessage = ERROR_MESSAGES.AUTH_ERROR;
      } else if (response.status === 400) {
        errorMessage = ERROR_MESSAGES.VALIDATION_ERROR;
      } else if (response.status === 404) {
        errorMessage = ERROR_MESSAGES.NOT_FOUND;
      } else if (response.status >= 500) {
        errorMessage = ERROR_MESSAGES.SERVER_ERROR;
      }

      const error: AppError = {
        code: `HTTP_${response.status}`,
        message: errorMessage,
        details: isJson ? await response.json() : await response.text(),
        timestamp: new Date().toISOString(),
      };

      throw error;
    }

    if (isJson) {
      return await response.json();
    }

    const text = await response.text();
    return {
      success: true,
      data: text as T,
    };
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getAuthHeaders();
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw {
            code: 'TIMEOUT',
            message: ERROR_MESSAGES.TIMEOUT_ERROR,
            timestamp: new Date().toISOString(),
          } as AppError;
        }

        if (error.message.includes('fetch')) {
          throw {
            code: 'NETWORK_ERROR',
            message: ERROR_MESSAGES.NETWORK_ERROR,
            timestamp: new Date().toISOString(),
          } as AppError;
        }
      }

      throw error;
    }
  }

  // Trip Generation
  async generateTrip(tripData: TripFormData): Promise<ApiResponse<TripGenerationResponse>> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw {
        code: 'AUTH_REQUIRED',
        message: 'Usuário não autenticado',
        timestamp: new Date().toISOString(),
      } as AppError;
    }

    return this.makeRequest<TripGenerationResponse>(API_CONFIG.ENDPOINTS.TRIP_GENERATION, {
      method: 'POST',
      body: JSON.stringify({
        ...tripData,
        userId: user.id,
        userEmail: user.email,
      }),
    });
  }

  // Get Travel Packages
  async getTravelPackages(destination?: string): Promise<ApiResponse<TravelPackage[]>> {
    const params = destination ? `?destination=${encodeURIComponent(destination)}` : '';
    return this.makeRequest<TravelPackage[]>(`${API_CONFIG.ENDPOINTS.PACKAGES}${params}`);
  }

  // Get User Trips
  async getUserTrips(): Promise<ApiResponse<TripGenerationResponse[]>> {
    return this.makeRequest<TripGenerationResponse[]>(API_CONFIG.ENDPOINTS.USER_TRIPS);
  }

  // Get Offers
  async getOffers(): Promise<ApiResponse<any[]>> {
    return this.makeRequest<any[]>(API_CONFIG.ENDPOINTS.OFFERS);
  }

  // Save Trip to Local Storage
  saveTripToStorage(tripData: TripFormData, response: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TRIP_FORM_DATA, JSON.stringify(tripData));
      localStorage.setItem(STORAGE_KEYS.WEBHOOK_RESPONSE, response);
      localStorage.setItem(STORAGE_KEYS.TRIP_TIMESTAMP, new Date().toISOString());
    } catch (error) {
      console.error('Error saving trip to storage:', error);
    }
  }

  // Get Trip from Local Storage
  getTripFromStorage(): {
    tripData: TripFormData | null;
    response: string | null;
    timestamp: string | null;
  } {
    try {
      const tripData = localStorage.getItem(STORAGE_KEYS.TRIP_FORM_DATA);
      const response = localStorage.getItem(STORAGE_KEYS.WEBHOOK_RESPONSE);
      const timestamp = localStorage.getItem(STORAGE_KEYS.TRIP_TIMESTAMP);

      return {
        tripData: tripData ? JSON.parse(tripData) : null,
        response: response || null,
        timestamp: timestamp || null,
      };
    } catch (error) {
      console.error('Error reading trip from storage:', error);
      return {
        tripData: null,
        response: null,
        timestamp: null,
      };
    }
  }

  // Clear Trip from Local Storage
  clearTripFromStorage(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.TRIP_FORM_DATA);
      localStorage.removeItem(STORAGE_KEYS.WEBHOOK_RESPONSE);
      localStorage.removeItem(STORAGE_KEYS.TRIP_TIMESTAMP);
    } catch (error) {
      console.error('Error clearing trip from storage:', error);
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export types for convenience
export type { ApiResponse, TripGenerationResponse, TravelPackage }; 