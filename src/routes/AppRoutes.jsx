import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Watch from "../pages/Watch";
import Upload from "../pages/Upload";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import LikedVideos from "../pages/LikedVideos";
import Subscriptions from "../pages/Subscriptions";
import WatchLater from "../pages/WatchLater";
import History from "../pages/History";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:videoId" element={<Watch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/liked" element={<LikedVideos />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/watch-later" element={<WatchLater />} />
            <Route path="/history" element={<History />} />
        </Routes>
    );
}

export default AppRoutes;