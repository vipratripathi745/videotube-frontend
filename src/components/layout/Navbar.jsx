import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiSearch,
    FiMenu,
    FiUpload,
    FiUser,
} from "react-icons/fi";

function Navbar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (search.trim()) {
            navigate(`/?query=${encodeURIComponent(search.trim())}`);
        } else {
            navigate("/");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800 backdrop-blur">
            <div className="max-w-screen-2xl mx-auto h-16 px-6 flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-4">

                    <button className="text-white text-2xl hover:text-red-500 transition">
                        <FiMenu />
                    </button>

                    <Link
                        to="/"
                        className="text-3xl font-extrabold text-red-600 tracking-tight"
                    >
                        VideoTube
                    </Link>

                </div>

                {/* Center */}
                <div className="hidden md:flex items-center w-full max-w-xl">

                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-zinc-900 border border-zinc-700 px-5 py-2.5 rounded-l-full text-white outline-none focus:border-red-500"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-zinc-800 border border-l-0 border-zinc-700 px-5 py-[11px] rounded-r-full hover:bg-zinc-700 transition"
                    >
                        <FiSearch className="text-white text-lg" />
                    </button>

                </div>

                {/* Right */}
                <div className="flex items-center gap-4">

                    <Link
                        to="/upload"
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-white font-medium transition"
                    >
                        <FiUpload />
                        <span className="hidden sm:inline">
                            Upload
                        </span>
                    </Link>

                    <Link
                        to="/profile"
                        className="w-11 h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition"
                    >
                        <FiUser className="text-xl text-white" />
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;