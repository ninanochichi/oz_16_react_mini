import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./index.css";
import { SupabaseProvider } from "./supabase/context"; // 전역 상태 관리 import

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <SupabaseProvider>
        <App />
      </SupabaseProvider>
    </StrictMode>
  </BrowserRouter>,
);
