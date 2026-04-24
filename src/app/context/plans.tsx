import { createContext, useContext, useEffect, useState } from "react";

import { IcreatePlan, Plan } from "@/app/dashboard/types/index.types";
import {
  FcreatePlan,
  FdeletePlan,
  FfetchPlans,
  FupdatePlan,
} from "@/services/fetchPlans";
import { PlansContextType } from "@/interfaces/interfaces";

export const PlansContext = createContext<PlansContextType>({
  plans: [],
  setPlans: () => {},
  createPlan: async () => null,
  deletePlan: async () => null,
  updatePlan: async () => null,
});

export const usePlansContext = () => useContext(PlansContext);

export const PlansProvider = ({ children }: { children: React.ReactNode }) => {
  const [plans, setPlans] = useState<Plan[]>([]);

  async function createPlan(plan: IcreatePlan) {
    try {
      const res = await FcreatePlan(plan);
      if (!res) return null;
      setPlans((currentPlans) => [...currentPlans, res]);
    } catch {
      return null;
    }
  }

  async function deletePlan(plan: Plan) {
    const res = await FdeletePlan(plan);
    if (!res) return null;
    setPlans((currentPlans) =>
      currentPlans.filter((currentPlan) => currentPlan.id !== plan.id),
    );
  }

  async function updatePlan(plan: Plan) {
    const res = await FupdatePlan(plan);
    if (!res) return null;
    setPlans((currentPlans) =>
      currentPlans.map((currentPlan) =>
        currentPlan.id === plan.id ? res : currentPlan,
      ),
    );
  }

  useEffect(() => {
    let isMounted = true;

    const loadPlans = async () => {
      try {
        const res = await FfetchPlans();
        if (!isMounted || !res) return;
        setPlans(res);
      } catch {
        // No bloqueamos la UI si falla la carga inicial.
      }
    };

    void loadPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PlansContext.Provider
      value={{
        plans,
        setPlans,
        createPlan,
        deletePlan,
        updatePlan,
      }}
    >
      {children}
    </PlansContext.Provider>
  );
};
