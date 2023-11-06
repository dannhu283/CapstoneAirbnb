import fetcher from "./fetcher";

export async function getRoomByLocation(placeId) {
  try {
    const response = await fetcher.get("/phong-thue/lay-phong-theo-vi-tri", {
      params: {
        maViTri: placeId,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getRoomDetail(roomId) {
  try {
    const response = await fetcher.get(`/phong-thue/${roomId}`);
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getRoomisBooked() {
  try {
    const response = await fetcher.get("/dat-phong");
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
export async function bookingRoom(payload) {
  try {
    const response = await fetcher.post("/dat-phong", payload);
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getHistoryRoom(userId) {
  try {
    const response = await fetcher.get(
      `/dat-phong/lay-theo-nguoi-dung/${userId}`
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export const removeBooked = async (id) => {
  try {
    const response = await fetcher.delete(`/dat-phong/${id}`);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
