import axios from "axios";

const fetcher = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MiIsIkhldEhhblN0cmluZyI6IjI4LzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTA3ODQwMDAwMCIsIm5iZiI6MTY4MTE0NjAwMCwiZXhwIjoxNzA5MjI2MDAwfQ.GboZ7OZlrOvJ_T6lEZ9PfGJD8vygDn30BxaLgB43WbM",
  },
});

fetcher.interceptors.request.use((request) => {
  //kiểm tra user đã đăng nhập hya chưa để thêm token của user vào headers
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    request.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return request;
});

//response interceptors
fetcher.interceptors.response.use(
  (response) => {
    // có thể thay đổi response trước khi trả về
    return response;
  },
  (error) => {
    // kiểm tra nếu lỗi là 401 =>token không hợp lệ=>đăng xuất
    if (error.response.status === 401) {
      localStorage.removeItem("currentUser");
      window.location.replace("/log-in");
    }
    return Promise.reject(error);
  }
);

export default fetcher;
