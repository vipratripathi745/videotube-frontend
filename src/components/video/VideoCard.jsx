import { useNavigate, Link } from "react-router-dom";

function VideoCard({ video }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/watch/${video._id}`)}
            className="group cursor-pointer"
        >
            <div className="overflow-hidden rounded-2xl">

                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video object-cover transition duration-500 group-hover:scale-105"
                />

            </div>

            <div className="flex gap-3 mt-4">

                <Link
                    to={`/channel/${video.owner?.username}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={
                            video.owner?.avatar ||
                            "https://via.placeholder.com/40"
                        }
                        alt="avatar"
                        className="w-11 h-11 rounded-full object-cover"
                    />
                </Link>

                <div className="flex-1">

                    <h2 className="text-white font-semibold leading-6 line-clamp-2">
                        {video.title}
                    </h2>

                    <Link
                        to={`/channel/${video.owner?.username}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 text-sm mt-2 hover:text-white block"
                    >
                        {video.owner?.username}
                    </Link>

                    <p className="text-gray-500 text-xs mt-1">
                        {video.views} views •{" "}
                        {new Date(video.createdAt).toLocaleDateString()}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default VideoCard;