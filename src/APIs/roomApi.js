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
