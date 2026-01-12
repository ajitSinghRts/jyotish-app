/**
 * API Response Types for Jyotish-App Frontend
 * Provides TypeScript interfaces for all backend API responses
 */

// ===== Status Check =====
export interface StatusCheck {
  id: string;
  client_name: string;
  timestamp: string; // ISO8601 format
}

export interface CreateStatusCheckRequest {
  client_name: string;
}

// ===== Authentication (TODO: Implement in backend) =====
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user?: UserProfile;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name?: string;
}

export interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  created_at: string;
}

// ===== Profile/Birth Data (TODO: Implement in backend) =====
export interface Profile {
  id: number;
  name: string;
  birth_date: string; // YYYY-MM-DD
  birth_time: string; // HH:MM:SS
  birth_place: string;
  latitude: number;
  longitude: number;
  timezone: string;
  created_at: string;
}

// ===== Chart Calculations (TODO: Implement in backend) =====
export interface NatalChartRequest {
  date: string;
  time: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface NatalChartResponse {
  planets: Record<string, PlanetPosition>;
  houses: Record<number, number>;
  ascendant: number;
}

export interface PlanetPosition {
  name: string;
  longitude: number;
  latitude: number;
  speed: number;
  sign: string;
  nakshatra: string;
}

// ===== Generic API Error =====
export interface ApiError {
  status: number;
  code: string;
  message: string;
  details?: any;
}

// ===== Generic API Response Wrapper =====
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: string;
}

// ===== Pagination =====
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// ===== Health Check =====
export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  database: 'connected' | 'disconnected';
  cache: 'connected' | 'disconnected';
  uptime: number; // seconds
  version: string;
}

// ===== TODO: Add more types for other endpoints =====
// - Varga charts
// - Dashas (Vimshottari)
// - Yogas
// - Ashtakavarga
// - Compatibility
// - Remedies
// - Knowledge base
// - Chat messages
