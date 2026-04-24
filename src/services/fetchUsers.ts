import {
  IFormContactResponse,
  ILoginResponse,
  ILoginUser,
  IUsersForm,
} from "@/interfaces/interfaces";

const urlBack = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const FsendFormContact = async (
  formData: IUsersForm
): Promise<IFormContactResponse> => {
  try {
    const response = await fetch(`${urlBack}/users-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Si el servidor responde pero con error
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message:
          typeof data?.message === "string"
            ? data.message
            : Array.isArray(data?.message)
              ? data.message.join(", ")
              : `Error del servidor (${response.status})`,
      };
    }

    return {
      success: true,
      message:
        typeof data?.message === "string"
          ? data.message
          : "Formulario enviado correctamente.",
      data,
    };
  } catch (error) {
    // Esto pasa cuando el backend está apagado
    console.error("Error de red o servidor caído:", error);

    return {
      success: false,
      message: "Servidor no disponible. Intenta nuevamente más tarde.",
    };
  }
};

export const FsignIn = async (
  user: ILoginUser
): Promise<ILoginResponse> => {
  try {
    const response = await fetch(`${urlBack}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    if (!response.ok) {
      return {
        message: typeof data?.message === "string" ? data.message : "Credenciales invalidas",
      };
    }

    return {
      message: typeof data?.message === "string" ? data.message : "Login exitoso",
      token: typeof data?.token === "string" ? data.token : undefined,
    };
  } catch (error) {
    throw error
  }
};

export const FlogOut = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${urlBack}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const data = await response.json();
    return data
  } catch (error) {
    throw error
  }
}
