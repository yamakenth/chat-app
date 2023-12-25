export const createHeaders = (authToken?: string): HeadersInit => {
  let headers: Record<string, string> = {
    "Content-type": "application/json",
  };
  if (authToken) {
    headers = { Authorization: `Bearer ${authToken}`, ...headers };
  }
  return headers;
};
