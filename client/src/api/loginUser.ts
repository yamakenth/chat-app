import { createHeaders } from "./utils";

const loginUser = async (email?: string, password?: string) => {
  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const headers = createHeaders();
  const body = JSON.stringify({ email, password });

  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers,
      body,
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export default loginUser;
