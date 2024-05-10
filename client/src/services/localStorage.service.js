const ACCESS_KEY = 'jwt-access_token';
const REFRESH_KEY = 'jwt-refresh_token';
const EXPIRES_KEY = 'jwt-expires';
const USERID_KEY = 'user-local-id(userId)';

export function setTokens({ refreshToken, idToken, localId, expiresIn = 3600 }) {
  const expiresDate = +new Date().getTime() + +(expiresIn * 1000);
  localStorage.setItem(USERID_KEY, localId);
  localStorage.setItem(ACCESS_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}

export function removeAuthData() {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
};

export default localStorageService;
