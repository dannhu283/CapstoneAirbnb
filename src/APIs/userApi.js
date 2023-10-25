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
