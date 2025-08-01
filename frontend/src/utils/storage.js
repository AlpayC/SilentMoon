// Safe JSON parsing utility
export const safeJSONParse = (item, fallback = null) => {
  try {
    const parsed = JSON.parse(item);
    return parsed;
  } catch (error) {
    return fallback;
  }
};

// Safe session storage getter
export const getSessionItem = (key, fallback = null) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? safeJSONParse(item, fallback) : fallback;
  } catch (error) {
    return fallback;
  }
};

// Safe session storage setter
export const setSessionItem = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};