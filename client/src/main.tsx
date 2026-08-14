import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "./lib/trpc";
import "./index.css";
import "./App.css";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import { CatalogProvider } from "./context/CatalogContext";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find root element");

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: "/api/trpc", transformer: superjson as any, fetch: (input, init) => fetch(input, { ...init, credentials: "include" }) })],
});

createRoot(rootElement).render(
  <StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <CatalogProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CatalogProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </trpc.Provider>
  </StrictMode>,
);
