import Cookies from "js-cookie";
import { EnumsData } from "./enums";

const TokenKey = EnumsData.TOKEN_KEY;

export function getToken() {
  return Cookies.get(TokenKey) || "";
}

export function setToken(token) {
  return Cookies.set(TokenKey, token) || "";
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
export function clearCache() {
  removeToken();
  localStorage.removeItem(EnumsData.USER_PERSIST_KEY);
}

