// routes
import { apiAdminConfig } from "../utils/api";
// utils

// ----------------------------------------------------------------------

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  return true;
};

// ----------------------------------------------------------------------

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("LogisticAdminToken", accessToken);

    apiAdminConfig.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  } else {
    localStorage.removeItem("LogisticAdminToken");

    delete apiAdminConfig.defaults.headers.common.Authorization;
  }
};
