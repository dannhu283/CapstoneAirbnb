import fetcher from "./fetcher";

export async function getLocation() {
  try {
    const response = await fetcher.get("/vi-tri");
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
