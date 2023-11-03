import fetcher from "./fetcher";

export const login = async (payload) => {
  try {
    const response = await fetcher.post("/auth/signin", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const logup = async (payload) => {
  try {
    const response = await fetcher.post("/auth/signup", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const getInfor = async (userId) => {
  try {
    const response = await fetcher.get("/users");
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const addUser = async (payload) => {
  try {
    const response = await fetcher.post("/users", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const removeUser = async (id) => {
  try {
    const response = await fetcher.delete("/users", {
      params: {
        id: id || undefined,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
