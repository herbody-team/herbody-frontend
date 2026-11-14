const API_URL = "/backend-api";

type ApiOptions = RequestInit & { token?: string | null };

export async function apiRequest<T>(
  path: string,
  { token, headers, ...options }: ApiOptions = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const body = (await response.json().catch(() => null)) as
    | { message?: string; error?: string }
    | T
    | null;

  if (!response.ok) {
    const message =
      body && typeof body === "object" && ("message" in body || "error" in body)
        ? ("message" in body ? body.message : body.error) || "Something went wrong."
        : "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return body as T;
}

export function saveAccessToken(data: unknown) {
  if (!data || typeof data !== "object") return;
  const record = data as Record<string, unknown>;
  const token =
    (typeof record.accessToken === "string" && record.accessToken) ||
    (typeof record.token === "string" && record.token);
  if (token) sessionStorage.setItem("herbody_access_token", token);
}

export function getAccessToken() {
  return typeof window === "undefined"
    ? null
    : sessionStorage.getItem("herbody_access_token");
}
