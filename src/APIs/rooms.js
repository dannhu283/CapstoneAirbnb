import fetcher from "./fetcher";

export async function getRooms(page,keyword) {
  try {
    const respone = await fetcher.get("/phong-thue/phan-trang-tim-kiem",{
      params:{
        pageIndex:page || 1,
        pageSize:10,
        keyword:keyword || null
      }
    })
    return respone.data.content
  } catch (error) {
    throw error.respone.content
  }
}