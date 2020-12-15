import {TOKEN_LS_KEY} from "./constants";

export const isLoggedIn = () => {
  const token = localStorage.getItem(TOKEN_LS_KEY);
  return Boolean(token);
};
