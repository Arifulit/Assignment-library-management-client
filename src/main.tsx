
import App from './App.tsx'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { store } from "./redux/store.ts";
import { Toaster } from "@/components/ui/sonner"



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
       <Toaster/>
      <BrowserRouter>
        <Navbar />
        <main className="min-h-screen bg-gray-100">
          <App />
        </main>
        <Footer />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
