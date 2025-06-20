// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://n8n.nomadeia.com.br',
  ENDPOINTS: {
    TRIP_GENERATION: '/webhook/gerar-roteiro',
    PACKAGES: '/webhook/pacotes',
    OFFERS: '/webhook/ofertas',
    USER_TRIPS: '/webhook/minhas-viagens',
  },
  TIMEOUT: 30000, // 30 seconds
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'Nomade IA',
  DESCRIPTION: 'Planejamento de viagens com inteligência artificial',
  VERSION: '1.0.0',
  AUTHOR: 'Nomade Team',
} as const;

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 5000,
  DEBOUNCE_DELAY: 300,
} as const;

// Form Validation
export const VALIDATION_RULES = {
  MIN_BUDGET: 100,
  MAX_BUDGET: 100000,
  MIN_DAYS: 1,
  MAX_DAYS: 30,
  MIN_PEOPLE: 1,
  MAX_PEOPLE: 10,
  PASSWORD_MIN_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  TRIP_FORM_DATA: 'tripFormData',
  WEBHOOK_RESPONSE: 'webhookResponse',
  TRIP_TIMESTAMP: 'tripTimestamp',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
} as const;

// Error Messages
export const ERROR_MESSAGES: Record<string, string> = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet e tente novamente.',
  TIMEOUT_ERROR: 'Tempo limite excedido. Tente novamente.',
  AUTH_ERROR: 'Erro de autenticação. Tente fazer login novamente.',
  VALIDATION_ERROR: 'Dados inválidos enviados. Verifique os campos preenchidos.',
  SERVER_ERROR: 'Erro interno do servidor. Tente novamente em alguns minutos.',
  NOT_FOUND: 'Serviço não encontrado. Verifique a configuração.',
  UNKNOWN_ERROR: 'Ocorreu um erro inesperado. Tente novamente.',
  REQUIRED_FIELD: 'Este campo é obrigatório.',
  INVALID_EMAIL: 'Email inválido.',
  PASSWORD_TOO_SHORT: 'A senha deve ter pelo menos 6 caracteres.',
  PASSWORDS_DONT_MATCH: 'As senhas não coincidem.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  TRIP_GENERATED: 'Roteiro gerado com sucesso!',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  PASSWORD_RESET_SENT: 'Email de redefinição de senha enviado!',
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  SIGNUP_SUCCESS: 'Conta criada com sucesso!',
  LOGOUT_SUCCESS: 'Logout realizado com sucesso!',
} as const;

// Navigation
export const NAVIGATION = {
  HOME: '/',
  AUTH: '/auth',
  PLANNER: '/planner',
  SUMMARY: '/summary',
  ITINERARY: '/itinerary',
  OFFERS: '/offers',
  RESULT: '/result',
  MY_TRIPS: '/my-trips',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;

// Social Media
export const SOCIAL_MEDIA = {
  FACEBOOK: 'https://facebook.com/nomadeia',
  INSTAGRAM: 'https://instagram.com/nomadeia',
  TWITTER: 'https://twitter.com/nomadeia',
  LINKEDIN: 'https://linkedin.com/company/nomadeia',
} as const;

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'contato@nomadeia.com.br',
  PHONE: '+55 (11) 99999-9999',
  ADDRESS: 'São Paulo, SP, Brasil',
  SUPPORT_HOURS: 'Segunda a Sexta, 9h às 18h',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: process.env.NODE_ENV === 'production',
  ENABLE_DEBUG_MODE: process.env.NODE_ENV === 'development',
  ENABLE_BETA_FEATURES: false,
} as const;
