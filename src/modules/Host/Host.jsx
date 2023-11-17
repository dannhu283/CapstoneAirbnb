import { Container, Grid, Typography, Box, Divider } from "@mui/material";
import React from "react";
import { Title, Desc, HostTitle, Stick } from "./index";
import { ButtonCustom } from "../../Components/Button";

export default function Host() {
  return (
    <Container>
      <Box sx={{ margin: "120px 0 25px 0" }}>
        <Title>Dễ dàng cho thuê nhà trên Airbnb với Airbnb Setup</Title>
        <img
          src="/img/d640d9a8-5a64-4cdd-b1e9-d56256c568bc.jpg"
          alt="host"
          style={{ width: "100%", marginBottom: "20px" }}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography sx={{ fontWeight: 600, fontSize: "17px" }}>
              Nhận sự hướng dẫn riêng từ một Chủ nhà siêu cấp
            </Typography>
            <Desc>
              Chúng tôi sẽ kết nối bạn với một Chủ nhà siêu cấp trong khu vực
              của bạn, người sẽ hướng dẫn bạn từ câu hỏi đầu tiên cho đến vị
              khách đầu tiên – qua điện thoại, cuộc gọi video hoặc tính năng trò
              chuyện.
            </Desc>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography sx={{ fontWeight: 600, fontSize: "17px" }}>
              Vị khách có kinh nghiệm cho lượt đặt phòng đầu tiên của bạn
            </Typography>
            <Desc>
              Với lượt đặt phòng đầu tiên, bạn có thể lựa chọn chào đón một
              khách có kinh nghiệm, đã có ít nhất 3 kỳ ở và lịch sử hoạt động
              tốt trên Airbnb.
            </Desc>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography sx={{ fontWeight: 600, fontSize: "17px" }}>
              Hỗ trợ đặc biệt từ Airbnb
            </Typography>
            <Desc>
              Chỉ cần nhấn nút là Chủ nhà mới có thể liên hệ với nhân viên Hỗ
              trợ cộng đồng được đào tạo đặc biệt, có thể trợ giúp về mọi vấn
              đề, từ sự cố tài khoản cho đến hỗ trợ thanh toán.
            </Desc>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <img
          src="/img/6cb045db8d1529954753a067c4232450867b48e3-1364x770.webp"
          alt="host"
          style={{ width: "300px", marginLeft: "35%" }}
        />
        <HostTitle>
          Cho thuê nhà trên Airbnb với chương trình bảo vệ toàn diện
        </HostTitle>
        <Grid container spacing={2}>
          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <Stick style={{ fontSize: "20px" }}> Airbnb</Stick>
          </Grid>
          <Grid item xs={3}>
            <Stick style={{ fontSize: "20px" }}>Đơn vị cạnh tranh</Stick>
          </Grid>
          <Divider sx={{ width: "100%", height: "3px", margin: "18px 0" }} />

          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              Xác minh danh tính của khách
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Stick> ✔️</Stick>
          </Grid>
          <Grid item xs={3}>
            <Stick> ✔️</Stick>
          </Grid>
          <Grid item xs={12} md={6}>
            Hệ thống xác minh toàn diện của chúng tôi kiểm tra các thông tin như
            tên, địa chỉ, giấy tờ tùy thân do chính phủ cấp và nhiều thông tin
            khác để xác nhận danh tính của khách đặt phòng/đặt chỗ trên Airbnb.
          </Grid>
          <Divider sx={{ width: "100%", height: "3px", margin: "18px 0" }} />

          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              Sàng lọc yêu cầu đặt phòng
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Stick> ✔️</Stick>
          </Grid>
          <Grid item xs={3}>
            <Stick> ❌</Stick>
          </Grid>
          <Grid item xs={12} md={6}>
            Công nghệ độc quyền của chúng tôi phân tích hàng trăm yếu tố trong
            mỗi yêu cầu đặt phòng để chặn những lượt đặt cho thấy nguy cơ cao về
            việc tổ chức tiệc tùng gây phiền toái và thiệt hại tài sản.
          </Grid>
          <Divider sx={{ width: "100%", height: "3px", margin: "18px 0" }} />

          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              Bảo vệ thiệt hại trị giá 3 triệu USD
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Stick> ✔️</Stick>
          </Grid>
          <Grid item xs={3}>
            <Stick> ❌</Stick>
          </Grid>
          <Grid item xs={12} md={6}>
            Airbnb sẽ bồi hoàn cho bạn về thiệt hại do khách gây ra đối với nhà
            và đồ đạc của bạn, đồng thời bao gồm các hình thức bảo vệ đặc biệt
            sau:
          </Grid>
          <Divider sx={{ width: "100%", height: "3px", margin: "18px 0" }} />

          <Grid item xs={6}>
            Tác phẩm nghệ thuật và tài sản có giá trị
          </Grid>
          <Grid item xs={3}>
            <Stick> ✔️</Stick>
          </Grid>
          <Grid item xs={3}>
            <Stick> ❌</Stick>
          </Grid>
          <Divider sx={{ width: "100%", height: "3px", margin: "18px 0" }} />

          <Grid item xs={6}>
            Ô tô và thuyền
          </Grid>
          <Grid item xs={3}>
            <Stick> ✔️</Stick>
          </Grid>
          <Grid item xs={3}>
            <Stick> ❌</Stick>
          </Grid>
          <Divider sx={{ width: "100%", height: "3px", margin: "18px 0" }} />

          <Grid item xs={6}>
            Thiệt hại do thú cưng
          </Grid>
          <Grid item xs={3}>
            <Stick> ✔️</Stick>
          </Grid>
          <Grid item xs={3}>
            <Stick> ❌</Stick>
          </Grid>
          <Divider sx={{ width: "100%", height: "3px", margin: "18px 0" }} />

          <Grid item xs={6}>
            Tổn thất thu nhập
          </Grid>
          <Grid item xs={3}>
            <Stick> ✔️</Stick>
          </Grid>
          <Grid item xs={3}>
            <Stick> ❌</Stick>
          </Grid>
          <Divider sx={{ width: "100%", height: "3px", margin: "18px 0" }} />

          <Grid item xs={6}>
            Vệ sinh chuyên sâu
          </Grid>
          <Grid item xs={3}>
            <Stick> ✔️</Stick>
          </Grid>
          <Grid item xs={3}>
            <Stick> ❌</Stick>
          </Grid>
          <Divider sx={{ width: "100%", height: "3px", margin: "18px 0" }} />

          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              Bảo hiểm trách nhiệm trị giá 1 triệu USD
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Stick> ✔️</Stick>
          </Grid>
          <Grid item xs={3}>
            <Stick> ✔️</Stick>
          </Grid>
          <Grid item xs={12} md={6}>
            Bạn được bảo vệ trong trường hợp hy hữu khi khách bị thương tổn hoặc
            đồ đạc của họ bị hư hại hay mất cắp.
          </Grid>
          <Divider sx={{ width: "100%", height: "3px", margin: "18px 0" }} />

          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              Đường dây an toàn 24/24
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Stick> ✔️</Stick>
          </Grid>
          <Grid item xs={3}>
            <Stick> ❌</Stick>
          </Grid>
          <Grid item xs={12} md={6}>
            Nếu bạn cảm thấy không an toàn, ứng dụng của chúng tôi cho phép bạn
            liên hệ bất kể ngày đêm với nhân viên hỗ trợ an toàn, được đào tạo
            đặc biệt của chúng tôi – chỉ bằng một thao tác chạm.
          </Grid>
          <Divider sx={{ width: "100%", height: "3px", margin: "18px 0" }} />

          <Grid xs={12}>
            <Stick>
              <ButtonCustom>Tìm hiểu thêm</ButtonCustom>
            </Stick>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
