import { NavLink } from "react-router-dom";
import {
    FiHome,
    FiPlayCircle,
    FiThumbsUp,
    FiUser,
    FiBarChart2,
} from "react-icons/fi";

function Sidebar() {
    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
            isActive
                ? "bg-red-600 text-white"
                : "text-gray-300 hover:bg-zinc-800 hover:text-white"
        }`;

    return (
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 min-h-screen p-4">

            <nav className="space-y-2">

                <NavLink
                    to="/"
                    className={linkClass}
                >
                    <FiHome size={20} />
                    <span>Home</span>
                </NavLink>

                <NavLink
                    to="/subscriptions"
                    className={linkClass}
                >
                    <FiPlayCircle size={20} />
                    <span>Subscriptions</span>
                </NavLink>

                <NavLink
                    to="/liked"
                    className={linkClass}
                >
                    <FiThumbsUp size={20} />
                    <span>Liked Videos</span>
                </NavLink>

                <NavLink
                    to="/profile"
                    className={linkClass}
                >
                    <FiUser size={20} />
                    <span>Profile</span>
                </NavLink>

                <NavLink
                    to="/dashboard"
                    className={linkClass}
                >
                    <FiBarChart2 size={20} />
                    <span>Dashboard</span>
                </NavLink>

            </nav>

        </aside>
    );
}

export default Sidebar;