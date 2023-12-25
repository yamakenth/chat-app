import { createHeaders } from "./utils";

const signUpUser = async (name?: string, email?: string, password?: string) => {
  if (!name || !email || !password) {
    throw new Error("Name, email, and password required");
  }

  const headers = createHeaders();
  const body = JSON.stringify({ name, email, password });

  try {
    const response = await fetch("/api/users/signup", {
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

export default signUpUser;
