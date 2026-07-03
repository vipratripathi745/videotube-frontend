import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Watch from "../pages/Watch";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/watch/:videoId"
                element={<Watch />}
            />
        </Routes>
    );
}

export default AppRoutes;