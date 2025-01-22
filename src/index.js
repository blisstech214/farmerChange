import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./provider/snackbar";
import { UserAuthContextProvider } from "./provider/auth/UserAuthContext";
import { UserSearchProviders } from "./provider/searchProvider";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./auth/JwtContext";
import ThemeProvider from "./theme";
import { SettingsProvider } from "./muiComponents/settings";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StepperProvider } from "./Components/stepper/stepperContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SettingsProvider>
          <SnackbarProvider>
            <AuthProvider>
              <StepperProvider>
                <HelmetProvider>
                  <BrowserRouter>
                    <UserSearchProviders>
                      <UserAuthContextProvider>
                        <App />
                      </UserAuthContextProvider>
                    </UserSearchProviders>
                  </BrowserRouter>
                </HelmetProvider>
              </StepperProvider>
            </AuthProvider>
          </SnackbarProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
