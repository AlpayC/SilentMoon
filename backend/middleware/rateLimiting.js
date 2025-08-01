import rateLimit from 'express-rate-limit';

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Create a no-op limiter for development
const noLimiter = (req, res, next) => next();

// General API rate limiting - Very permissive for normal usage
const generalLimiterConfig = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per 15 minutes (generous for normal use)
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const generalLimiter = isDevelopment ? noLimiter : generalLimiterConfig;

// Auth rate limiting - Allow reasonable retry attempts
const authLimiterConfig = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // limit each IP to 25 auth attempts per 15 minutes (allows development/testing)
  message: {
    error: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

export const authLimiter = isDevelopment ? noLimiter : authLimiterConfig;

// Rate limiting for API calls that might be expensive
const apiLimiterConfig = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 120, // limit each IP to 120 requests per minute (allows rapid browsing)
  message: {
    error: 'Too many API requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiLimiter = isDevelopment ? noLimiter : apiLimiterConfig;

// Rate limiting for user data modifications - Allow normal usage
const dataModificationLimiterConfig = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 data modification requests per 5 minutes
  message: {
    error: 'Too many data modification requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const dataModificationLimiter = isDevelopment ? noLimiter : dataModificationLimiterConfig;