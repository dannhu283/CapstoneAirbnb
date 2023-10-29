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

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="list-room/:placeId" element={<ListRoom />} />
            <Route path ="roomDetail/:roomId" element={<RoomDetail/>}/>
          </Route>
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/log-up" element={<LogUp />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
