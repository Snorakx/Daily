/**
 * API Service
 * 
 * Provides a centralized interface for making HTTP requests to the backend API.
 * Uses environment variables for configuration.
 */

// Types for request options and responses
type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  body?: Record<string, unknown> | unknown[];
  timeout?: number;
};

type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

class ApiService {
  private baseUrl: string;
  private apiKey: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number = 30000; // 30 seconds

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || '';
    this.apiKey = import.meta.env.VITE_API_KEY || '';
    
    if (!this.baseUrl) {
      console.warn('API URL not defined in environment variables');
    }
    
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (this.apiKey) {
      this.defaultHeaders['Authorization'] = `Bearer ${this.apiKey}`;
    }
  }

  /**
   * Builds the complete URL including query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(this.baseUrl + endpoint);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    
    return url.toString();
  }

  /**
   * Handles the fetch request with timeout
   */
  private async fetchWithTimeout(url: string, options: RequestInit, timeout: number): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      return response;
    } finally {
      clearTimeout(id);
    }
  }

  /**
   * Processes the API response
   */
  private async processResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const status = response.status;
    
    if (status >= 200 && status < 300) {
      try {
        const contentType = response.headers.get('content-type');
        let data = null;
        
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }
        
        return {
          data: data as T,
          error: null,
          status
        };
      } catch {
        return {
          data: null,
          error: 'Failed to parse response data',
          status
        };
      }
    } else {
      let errorMessage = `Request failed with status ${status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // If we can't parse the error, just use the default message
      }
      
      return {
        data: null,
        error: errorMessage,
        status
      };
    }
  }

  /**
   * Performs a GET request
   */
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options.params);
      const response = await this.fetchWithTimeout(
        url,
        {
          method: 'GET',
          headers: { ...this.defaultHeaders, ...options.headers }
        },
        options.timeout || this.defaultTimeout
      );
      
      return this.processResponse<T>(response);
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 0
      };
    }
  }

  /**
   * Performs a POST request
   */
  async post<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options.params);
      const response = await this.fetchWithTimeout(
        url,
        {
          method: 'POST',
          headers: { ...this.defaultHeaders, ...options.headers },
          body: options.body ? JSON.stringify(options.body) : undefined
        },
        options.timeout || this.defaultTimeout
      );
      
      return this.processResponse<T>(response);
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 0
      };
    }
  }

  /**
   * Performs a PUT request
   */
  async put<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options.params);
      const response = await this.fetchWithTimeout(
        url,
        {
          method: 'PUT',
          headers: { ...this.defaultHeaders, ...options.headers },
          body: options.body ? JSON.stringify(options.body) : undefined
        },
        options.timeout || this.defaultTimeout
      );
      
      return this.processResponse<T>(response);
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 0
      };
    }
  }

  /**
   * Performs a PATCH request
   */
  async patch<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options.params);
      const response = await this.fetchWithTimeout(
        url,
        {
          method: 'PATCH',
          headers: { ...this.defaultHeaders, ...options.headers },
          body: options.body ? JSON.stringify(options.body) : undefined
        },
        options.timeout || this.defaultTimeout
      );
      
      return this.processResponse<T>(response);
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 0
      };
    }
  }

  /**
   * Performs a DELETE request
   */
  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options.params);
      const response = await this.fetchWithTimeout(
        url,
        {
          method: 'DELETE',
          headers: { ...this.defaultHeaders, ...options.headers },
          body: options.body ? JSON.stringify(options.body) : undefined
        },
        options.timeout || this.defaultTimeout
      );
      
      return this.processResponse<T>(response);
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 0
      };
    }
  }
}

// Singleton instance
const apiService = new ApiService();

export default apiService; 