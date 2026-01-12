apiConfig.ts/**
 * API Configuration for Frontend
 * Centralized configuration for environment-specific API settings
 */

export const API_CONFIG = {
  // Environment detection
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
  
  // API Base URL - resolved from Vite environment variables
  baseUrl: import.meta.env.VITE_API_URL || (
    import.meta.env.MODE === 'production' 
      ? 'https://api.astroos.com/api'
      : 'http://localhost:8001/api'
  ),
  
  // Request Configuration
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  
  // Headers
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Token Configuration
  tokenKey: 'accessToken',
  refreshTokenKey: 'refreshToken',
  
  // Request/Response Logging
  enableRequestLogging: true,
  enableResponseLogging: true,
  
  // Error Handling
  retryableStatusCodes: [408, 429, 500, 502, 503, 504],
  
  // API Endpoints
  endpoints: {
    // Status checks
    statusChecks: '/status',
    healthCheck: '/health',
    
    // Authentication (TODO: Implement)
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      me: '/auth/me',
      refresh: '/auth/refresh',
    },
    
    // Profiles (TODO: Implement)
    profiles: {
      list: '/profiles',
      create: '/profiles',
      get: (id: number) => `/profiles/${id}`,
      update: (id: number) => `/profiles/${id}`,
      delete: (id: number) => `/profiles/${id}`,
    },
    
    // Charts (TODO: Implement)
    charts: {
      natal: '/charts/natal',
      varga: (num: number) => `/charts/varga/${num}`,
    },
    
    // Dashas (TODO: Implement)
    dashas: {
      vimshottari: '/dashas/vimshottari',
    },
    
    // Analysis (TODO: Implement)
    analysis: {
      yogas: '/yogas',
      ashtakavarga: '/ashtakavarga',
      compatibility: '/compatibility',
      varshaphala: '/varshaphala',
      shadbala: '/strength/shadbala',
      remedies: '/remedies',
      align27: '/align27',
    },
    
    // Knowledge Base (TODO: Implement)
    knowledge: {
      base: '/kb',
      chat: '/chat',
    },
    
    // Export (TODO: Implement)
    export: {
      pdf: (id: number) => `/export/pdf/${id}`,
    },
  },
};

// Export individual settings for easier access
export const API_BASE_URL = API_CONFIG.baseUrl;
export const API_TIMEOUT = API_CONFIG.timeout;
export const TOKEN_KEY = API_CONFIG.tokenKey;
