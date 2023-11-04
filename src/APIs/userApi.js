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
    const response = await fetcher.get(`/users/${userId}`);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const updateAvatarUser = async (payload) => {
  try {
    const response = await fetcher.post("/users/upload-avatar",payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const updateUser = async (userId,payload) => {
  try {
    const response = await fetcher.put(`/users/${userId}`,payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};