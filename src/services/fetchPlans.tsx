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

const getToken = async () => cookies.get("token") || "";

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
  } catch {
    return [];
  }
};

export const FupdatePlan = async (plan: Partial<Plan>): Promise<Plan> => {
  const token = await getToken();
  const backendUrl = getBackendUrl();
  const response = await fetch(`${backendUrl}/plans/update/${plan.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(plan),
  });

  return response.json();
};

export const FcreatePlan = async (plan: IcreatePlan): Promise<Plan> => {
  const token = await getToken();
  const backendUrl = getBackendUrl();
  const response = await fetch(`${backendUrl}/plans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(plan),
  });

  return response.json();
};

export const FdeletePlan = async (plan: Plan): Promise<Plan> => {
  const token = await getToken();
  const { id, ...rest } = plan;
  const backendUrl = getBackendUrl();
  const response = await fetch(`${backendUrl}/plans/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(rest),
  });

  return response.json();
};
