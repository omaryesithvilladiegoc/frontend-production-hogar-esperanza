import { IcreatePlan, Plan } from "@/app/dashboard/types/index.types";
import cookies from "js-cookie";
import { getPublicFetchOptions } from "@/lib/fetch-cache";

const urlBack = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();

const getBackendUrl = () => {
  if (!urlBack) {
    throw new Error("Falta NEXT_PUBLIC_BACKEND_URL");
  }

  return urlBack.replace(/\/+$/, "");
};

const getToken = async () => {
  const token = cookies.get("token") || "";
  return token
}

export const FfetchPlans = async (): Promise<Plan[]> => {
  try {
    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/plans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...getPublicFetchOptions(["plans"]),
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los planes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en fetchPlans:", error);

    // 🔴 En vez de romper, devuelves algo controlado
    return [];
  }
};

export const FupdatePlan = async (plan: Partial<Plan>): Promise<Plan> => {
  const token = await getToken();
  try {
    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/plans/update/${plan.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(plan),
    });
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error de red o servidor caído:", error);
    return plan as Plan
  }
}

export const FcreatePlan = async (plan: IcreatePlan): Promise<Plan> => {
  const token = await getToken();
  try {
    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(plan),
    });
    const data = await response.json();
    return data
  } catch (error) {
    throw error
  }
}

export const FdeletePlan = async (plan: Plan): Promise<Plan> => {
  const token = await getToken();
  const { id, ...rest } = plan;
  try {
    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/plans/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(rest),
    });
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error de red o servidor caído:", error);
    throw error
  }
}
