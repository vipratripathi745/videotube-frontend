import { Link } from "react-router-dom";
import {
    FiHome,
    FiPlayCircle,
    FiThumbsUp,
    FiUser,
} from "react-icons/fi";

function Sidebar() {
    return (
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 min-h-screen p-4">
            <nav className="space-y-2">

                {/* Working Route */}
                <Link
                    to="/"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition"
                >
                    <FiHome size={20} />
                    <span>Home</span>
                </Link>

                {/* Coming Soon */}
                <div className="flex items-center gap-3 p-3 rounded-lg text-gray-500 cursor-not-allowed">
                    <FiPlayCircle size={20} />
                    <span>Subscriptions (Coming Soon)</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg text-gray-500 cursor-not-allowed">
                    <FiThumbsUp size={20} />
                    <span>Liked Videos (Coming Soon)</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg text-gray-500 cursor-not-allowed">
                    <FiUser size={20} />
                    <span>Profile (Coming Soon)</span>
                </div>

            </nav>
        </aside>
    );
}

export default Sidebar;