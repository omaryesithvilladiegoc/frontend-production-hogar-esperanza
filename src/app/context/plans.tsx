import { createContext, useContext, useEffect, useState } from "react";

import { IcreatePlan, Plan} from "@/app/dashboard/types/index.types";
import { FcreatePlan, FdeletePlan, FfetchPlans, FupdatePlan } from "@/services/fetchPlans";
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
      console.log("Plan created:", res);
      setPlans([...plans, res]);
    } catch (error) {
      console.error("Error creating plan:", error);
      return null;
    }
  }

  async function deletePlan(plan: Plan) {
    try {
      const res = await FdeletePlan(plan);
      if (!res) return null;
      console.log("Plan deleted:", res);
      setPlans(plans.filter((p) => p.id !== plan.id));
    } catch (error) {
      console.error("Error deleting plan:", error);
      throw error;
    }
  }
  
 async function getPlans() {
    try {
      const res = await FfetchPlans();
      if (!res) return null;
      console.log("Plans fetched:", res);
      setPlans(res);
    } catch (error) {
      console.error("Error fetching plans:", error);
      return null;
    }
  }

  async function updatePlan(plan: Plan) {
    try {
      const res = await FupdatePlan(plan);
      if (!res) return null;
      console.log("Plan updated:", res);
      setPlans(plans.map((p) => (p.id === plan.id ? res : p)));
    } catch (error) {
      console.error("Error updating plan:", error);
      throw error;
    }
  }

  useEffect(() => {
    getPlans();
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

