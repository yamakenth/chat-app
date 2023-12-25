export const createHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {
    "Content-type": "application/json",
  };
  return headers;
};
