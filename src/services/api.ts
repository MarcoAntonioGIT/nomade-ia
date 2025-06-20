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

      const url = `${API_CONFIG.BASE_URL}${endpoint}`;
      
      // Debug logging in development
      if (import.meta.env.DEV) {
        console.log('=== DEBUG API REQUEST ===');
        console.log('URL:', url);
        console.log('Method:', options.method || 'GET');
        console.log('Headers:', headers);
        console.log('Body:', options.body);
        console.log('=======================');
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      
      // Debug logging in development
      if (import.meta.env.DEV) {
        console.log('=== DEBUG API RESPONSE ===');
        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);
        console.log('Headers:', Object.fromEntries(response.headers.entries()));
        console.log('========================');
      }

      return await this.handleResponse<T>(response);
    } catch (error) {
      // Enhanced error logging
      console.error('=== API REQUEST ERROR ===');
      console.error('Endpoint:', endpoint);
      console.error('URL:', `${API_CONFIG.BASE_URL}${endpoint}`);
      console.error('Error Type:', error instanceof Error ? error.constructor.name : typeof error);
      console.error('Error Message:', error instanceof Error ? error.message : error);
      console.error('Error Stack:', error instanceof Error ? error.stack : 'No stack available');
      console.error('Timestamp:', new Date().toISOString());
      console.error('========================');

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

    // Debug: Log all form data being sent
    const requestData = {
      ...tripData,
      userId: user.id,
      userEmail: user.email,
    };

    console.log('=== DADOS ENVIADOS AO WEBHOOK ===');
    console.log('URL:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRIP_GENERATION}`);
    console.log('Dados completos:', JSON.stringify(requestData, null, 2));
    console.log('Campos do formulário:');
    console.log('- Origin:', requestData.origin);
    console.log('- Destination:', requestData.destination);
    console.log('- Budget:', requestData.budget);
    console.log('- Budget Text:', requestData.budgetText);
    console.log('- People:', requestData.people);
    console.log('- Preferences:', requestData.preferences);
    console.log('- Dietary Restrictions:', requestData.dietaryRestrictions);
    console.log('- Departure Date:', requestData.departureDate);
    console.log('- Return Date:', requestData.returnDate);
    console.log('- Additional Info:', requestData.additionalInfo);
    console.log('- User ID:', requestData.userId);
    console.log('- User Email:', requestData.userEmail);
    console.log('================================');

    return this.makeRequest<TripGenerationResponse>(API_CONFIG.ENDPOINTS.TRIP_GENERATION, {
      method: 'POST',
      body: JSON.stringify(requestData),
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

  // Test webhook connectivity
  async testWebhookConnectivity(): Promise<boolean> {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRIP_GENERATION}`;
      
      console.log('=== TESTING WEBHOOK CONNECTIVITY ===');
      console.log('URL:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: true,
          message: 'Test connectivity',
          timestamp: new Date().toISOString(),
        }),
      });
      
      console.log('Response Status:', response.status);
      console.log('Response OK:', response.ok);
      
      if (response.ok) {
        console.log('✅ Webhook is accessible');
        return true;
      } else {
        console.log('❌ Webhook returned error status:', response.status);
        return false;
      }
    } catch (error) {
      console.error('❌ Webhook connectivity test failed:', error);
      return false;
    }
  }

  // Test general internet connectivity
  async testInternetConnectivity(): Promise<boolean> {
    try {
      const url = 'https://httpbin.org/post';
      
      console.log('=== TESTING INTERNET CONNECTIVITY ===');
      console.log('URL:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: true,
          message: 'Test internet connectivity',
          timestamp: new Date().toISOString(),
        }),
      });
      
      console.log('Response Status:', response.status);
      console.log('Response OK:', response.ok);
      
      if (response.ok) {
        console.log('✅ Internet connectivity is working');
        return true;
      } else {
        console.log('❌ Internet connectivity test failed');
        return false;
      }
    } catch (error) {
      console.error('❌ Internet connectivity test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export types for convenience
export type { ApiResponse, TripGenerationResponse, TravelPackage }; 