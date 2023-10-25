import fetcher from "./fetcher";

export async function getLocation() {
  try {
    const response = await fetcher.get("/vi-tri");
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}


export async function getLocations() {
  try {
    const response = await fetcher.get("/vi-tri/phan-trang-tim-kiem",{
      params:{
        pageIndex:1,
        pageSize:10,
        keyword:""
      }
    })
    return response.data?.content
  } catch (error) {
    throw error.response.content
  }
}