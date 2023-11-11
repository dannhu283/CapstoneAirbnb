import fetcher from "./fetcher";

export async function getLocation() {
  try {
    const response = await fetcher.get("/vi-tri");
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
export async function getLocationById(roomId) {
  try {
    const response = await fetcher.get(`/vi-tri/${roomId}`);
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getLocationByPageSize() {
  try {
    const response = await fetcher.get("/vi-tri/phan-trang-tim-kiem", {
      params: {
        pageIndex: 1,
        pageSize: 10,
        keyword: "",
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.content;
  }
}

export async function addLocation(payload) {
  try {
    const response = await fetcher.post("/vi-tri", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.content;
  }
}

export async function removeLocation(id) {
  try {
    const response = await fetcher.delete(`/vi-tri/${id}`);
    return response.data?.content;
  } catch (error) {
    throw error.response.content;
  }
}
export async function updateLocation(id, payload) {
  try {
    const response = await fetcher.put(`/vi-tri/${id}`, payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.content;
  }
}
