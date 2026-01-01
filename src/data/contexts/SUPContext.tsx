import { createContext } from "react";
import { SUPContextType } from "../types/sup";

/**
 * SUP rental context
 */
export const SUPContext = createContext<SUPContextType | null>(null);

