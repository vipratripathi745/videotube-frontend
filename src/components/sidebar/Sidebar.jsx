function Sidebar() {
    return (
        <aside className="w-64 h-[calc(100vh-64px)] bg-zinc-900 border-r border-zinc-800 text-white p-4">
            <ul className="space-y-4">
                <li className="cursor-pointer hover:text-red-500">
                    🏠 Home
                </li>

                <li className="cursor-pointer hover:text-red-500">
                    🔥 Trending
                </li>

                <li className="cursor-pointer hover:text-red-500">
                    📺 Subscriptions
                </li>

                <li className="cursor-pointer hover:text-red-500">
                    👤 Profile
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;