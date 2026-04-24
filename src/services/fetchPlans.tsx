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

type PlanArchiveResponse = {
  success: boolean;
  id: string;
};

const parsePlanError = async (response: Response, fallbackMessage: string) => {
  try {
    const data = (await response.json()) as { message?: string | string[] };
    const message = Array.isArray(data.message)
      ? data.message.join(", ")
      : data.message;

    throw new Error(message || fallbackMessage);
  } catch (error) {
    if (error instanceof Error && error.message !== fallbackMessage) {
      throw error;
    }

    throw new Error(fallbackMessage);
  }
};

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
  const { id, ...payload } = plan;

  if (!id) {
    throw new Error("No se encontró el identificador del plan a actualizar");
  }

  const response = await fetch(`${backendUrl}/plans/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await parsePlanError(response, "No se pudo actualizar el plan");
  }

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

  if (!response.ok) {
    await parsePlanError(response, "No se pudo crear el plan");
  }

  return response.json();
};

export const FdeletePlan = async (plan: Plan): Promise<PlanArchiveResponse> => {
  const token = await getToken();
  const { id } = plan;
  const backendUrl = getBackendUrl();
  const response = await fetch(`${backendUrl}/plans/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    await parsePlanError(response, "No se pudo archivar el plan");
  }

  return response.json();
};
