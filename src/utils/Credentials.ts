import { LOCAL_STORAGE } from "./Const";
import { getWindow } from "./Common";

export const getAccessToken = () => {
  const window = getWindow();
  if (window) {
    return window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
  }
  return null;
}
export const getAccountId = () => {
  const window = getWindow();
  if (window) {
    return window.localStorage.getItem(LOCAL_STORAGE.ACCOUNT_ID)
  }
  return null;
}

export const setAccessToken = (token: string) => {
  const window = getWindow();
  if (window) {
    window.localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token)
  }
}
export const setAccountId = (id: string) => {
  const window = getWindow();
  if (window) {
    window.localStorage.setItem(LOCAL_STORAGE.ACCOUNT_ID, id)
  }
}
