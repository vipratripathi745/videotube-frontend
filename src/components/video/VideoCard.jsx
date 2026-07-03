import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/watch/${video._id}`)}
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
        >
            {/* Thumbnail */}
            <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-44 object-cover"
            />

            {/* Video Info */}
            <div className="p-4">
                <h2 className="text-white font-semibold text-lg line-clamp-2">
                    {video.title}
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                    {video.owner?.username || "Unknown Channel"}
                </p>

                <p className="text-gray-500 text-xs mt-2">
                    {video.views} views •{" "}
                    {new Date(video.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}

export default VideoCard;