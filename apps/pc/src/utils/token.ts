export const TOKEN_KEY = "AuthenticationToken";
export const REFRESH_TOKEN = "RefreshToken";

type TokenKey = typeof TOKEN_KEY | typeof REFRESH_TOKEN;

const getToken = (key: TokenKey = 'AuthenticationToken') => localStorage.getItem(key) || "";
const setToken = (key: TokenKey = 'AuthenticationToken', token: string) => localStorage.setItem(key, token);
const clearToken = (key: TokenKey = 'AuthenticationToken') => localStorage.removeItem(key);

export { getToken, setToken, clearToken };
