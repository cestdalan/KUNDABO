import { createContext, useContext } from "react";
import { trpc } from "../lib/trpc";
import { PRODUCTS } from "../data/products";
import type { ProductType } from "./CartContext";

type CatalogContextValue = {
  products: ProductType[];
  loading: boolean;
  refresh: () => Promise<unknown>;
};

const CatalogContext = createContext<CatalogContextValue | undefined>(undefined);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const query = trpc.catalog.list.useQuery(undefined, { staleTime: 30_000, retry: 1 });
  const products = (query.data ?? PRODUCTS) as ProductType[];
  return (
    <CatalogContext.Provider value={{ products, loading: query.isLoading, refresh: query.refetch }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useCatalog must be used inside CatalogProvider");
  return context;
}
