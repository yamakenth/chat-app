import { createHeaders } from "./utils";

const deleteUser = async (userId?: string, userToken?: string) => {
  if (!userId || !userToken) {
    throw new Error("Failed to extract User ID or User Token");
  }

  const headers = createHeaders(userToken);

  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
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

export default deleteUser;
