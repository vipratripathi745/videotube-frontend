import { Link } from "react-router-dom";
import { FiSearch, FiMenu } from "react-icons/fi";

function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800 px-6 py-3">
            <div className="flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-4">

                    <button className="text-2xl">
                        <FiMenu />
                    </button>

                    <Link
                        to="/"
                        className="text-2xl font-bold text-red-500"
                    >
                        VideoTube
                    </Link>

                </div>

                {/* Center */}

                <div className="hidden md:flex items-center w-1/2">

                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-zinc-800 rounded-l-full px-5 py-2 outline-none"
                    />

                    <button className="bg-zinc-700 px-5 py-2 rounded-r-full">
                        <FiSearch />
                    </button>

                </div>

                {/* Right */}

                <div className="flex items-center gap-4">

                    <img
                        src="https://via.placeholder.com/40"
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                    />

                </div>

            </div>
        </nav>
    );
}

export default Navbar;