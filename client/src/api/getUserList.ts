import { createHeaders } from "./utils";

const getUserList = async (nameOrEmail?: string) => {
  const headers = createHeaders();

  const searchParams = nameOrEmail ? new URLSearchParams({ nameOrEmail }) : "";

  try {
    const response = await fetch(`/api/users?${searchParams}`, {
      method: "GET",
      headers,
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

export default getUserList;
