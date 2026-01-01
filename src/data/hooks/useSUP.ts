import { useContext } from "react";
import { SUPContext } from "../contexts/SUPContext";
import { SUPContextType } from "../types/sup";

/**
 * Hook to access SUP rental context
 * @throws Error if used outside of SUPProvider
 */
export function useSUP(): SUPContextType {
  const context = useContext(SUPContext);

  if (!context) {
    throw new Error("useSUP must be used within a SUPProvider");
  }

  return context;
}

