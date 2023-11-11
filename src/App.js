import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserContext/UserContext";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./Components/NotFound";
import Home from "./modules/Home/Home";
import "./index.css";
import ListRoom from "./modules/ListRoom";
import LogIn from "./modules/Auth/LogIn";
import LogUp from "./modules/Auth/LogUp";
import RoomDetail from "./modules/RoomDetail";
import ProtectedRoute from "./routers/ProtectedRoute";
import Profile from "./modules/Profile";
import AdminLayout from "./modules/AdminLayout/AdminLayout";
import UserManagement from "./modules/AdminLayout/UserManagement/UserManagement";
import LocationManagement from "./modules/AdminLayout/LocationManagement";
import Booking from "./modules/AdminLayout/RoomManagement/Booking/Booking";
import ListRoomAdmin from "./modules/AdminLayout/RoomManagement/ListRoomAdmin";
import ProtectedAmin from "./routers/ProtectedAmin";
import Access from "./Components/Access";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* User */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="list-room/:placeId" element={<ListRoom />} />

            <Route element={<ProtectedRoute />}>
              <Route path="profile/:userId" element={<Profile />} />
              <Route path="roomDetail/:roomId" element={<RoomDetail />} />
            </Route>
          </Route>
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/log-up" element={<LogUp />} />

          {/* Admin */}
          <Route element={<ProtectedAmin />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="usermanagement" element={<UserManagement />} />
              <Route
                path="locationmanagement"
                element={<LocationManagement />}
              />
              <Route path="booking" element={<Booking />} />
              <Route path="listroom-Admin" element={<ListRoomAdmin />} />
            </Route>
          </Route>
          <Route path="access" element={<Access />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
export default App;
