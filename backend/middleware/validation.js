import { body, param, validationResult } from 'express-validator';

export const validateSignup = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must contain only letters and spaces'),
  
  body('lastname')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Lastname must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Lastname must contain only letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 6, max: 128 })
    .withMessage('Password must be between 6 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export const validateUserId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format'),
];

export const validateExerciseId = [
  body('exercise_id')
    .isMongoId()
    .withMessage('Invalid exercise ID format'),
];

export const validatePlaylistId = [
  body('playlist_id')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Playlist ID is required'),
];

export const validateReminder = [
  body('reminderdays')
    .optional()
    .isArray()
    .withMessage('Reminder days must be an array'),
  
  body('remindertime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Reminder time must be in HH:MM format'),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};