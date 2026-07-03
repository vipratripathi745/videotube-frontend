import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/watch/${video._id}`)}
            className="group cursor-pointer"
        >
            <div className="overflow-hidden rounded-xl">

                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                />

            </div>

            <div className="flex gap-3 mt-3">

                <img
                    src={
                        video.owner?.avatar ||
                        "https://via.placeholder.com/40"
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                />

                <div>

                    <h2 className="text-white font-semibold line-clamp-2">
                        {video.title}
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                        {video.owner?.username ||
                            "Unknown Channel"}
                    </p>

                    <p className="text-gray-500 text-xs mt-1">
                        {video.views} views •{" "}
                        {new Date(
                            video.createdAt
                        ).toLocaleDateString()}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default VideoCard;