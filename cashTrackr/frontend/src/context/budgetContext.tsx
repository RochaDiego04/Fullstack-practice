"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Budget } from "../schemas";

interface BudgetContextType {
  budget: Budget | undefined;
  setBudget: Dispatch<SetStateAction<Budget | undefined>>;
}

const defaultContextValue: BudgetContextType = {
  budget: undefined,
  setBudget: () => {},
};

export const BudgetContext = createContext<BudgetContextType | null>(null);

interface BudgetContextProvider {
  children: ReactNode;
  budget?: Budget;
}

export const BudgetProvider: React.FC<BudgetContextProvider> = ({
  children,
  budget: initialBudget,
}) => {
  const [budget, setBudget] = useState<Budget | undefined>(initialBudget);

  return (
    <BudgetContext.Provider value={{ budget, setBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};

// Consumers (e.g. BudgetForm) render in both the edit page (wrapped in a
// BudgetProvider seeded from the fetched budget) and the create page (no
// provider, nothing to prefill). Falling back to the default instead of
// throwing lets the same consumer work unwrapped.
export const useBudgetContext = (): BudgetContextType => {
  const context = useContext(BudgetContext);
  return context ?? defaultContextValue;
};
