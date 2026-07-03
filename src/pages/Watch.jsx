import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentList from "../components/comments/CommentList";
import LikeButton from "../components/likes/LikeButton";
import videoService from "../services/video.service";
import SubscribeButton from "../components/subscription/SubscribeButton";
import { Link } from "react-router-dom";

function Watch() {
    const { videoId } = useParams();

    const [video, setVideo] = useState(null);
    const [recommendedVideos, setRecommendedVideos] = useState([]);

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        const fetchVideo = async () => {
            try {
                const response = await videoService.getVideoById(videoId);

                if (response.success) {
                    setVideo(response.data);

                    const allVideos = await videoService.getAllVideos();

                    if (allVideos.success) {
                        const filtered = allVideos.data.filter(
                            (v) => v._id !== videoId
                        );

                        setRecommendedVideos(filtered);
                    }

                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchVideo();
    }, [videoId]);

    if (!video) {
        return (
            <div className="flex-1 flex justify-center items-center bg-black text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex-1 bg-zinc-950 text-white min-h-screen">
            <div className="max-w-7xl mx-auto p-6 flex gap-8">

                {/* Left Side */}
                <div className="flex-1">

                    {/* Video */}
                    <video
                        src={video.videoFile}
                        controls
                        className="w-full rounded-2xl shadow-2xl bg-black"
                    />

                    {/* Title */}
                    <h1 className="text-3xl font-bold mt-6">
                        {video.title}
                    </h1>

                    {/* Channel Card */}
                    <div className="bg-zinc-900 rounded-xl p-5 mt-6 flex justify-between items-center flex-wrap gap-4">

                        <div className="flex items-center gap-4">

                            <img
                                src={
                                    video.owner?.avatar ||
                                    "https://via.placeholder.com/50"
                                }
                                alt="avatar"
                                className="w-12 h-12 rounded-full"
                            />

                            <div>
                                <h2 className="font-semibold">
                                    {video.owner?.username || "Unknown Channel"}
                                </h2>

                                <p className="text-gray-400 text-sm">
                                    0 Subscribers
                                </p>
                            </div>

                            <SubscribeButton
                                channelId={video.owner?._id}
                            />

                        </div>

                        <div className="flex gap-3">

                            <LikeButton
                                videoId={video._id}
                                initialLikes={video.likesCount}
                            />

                            <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full">
                                Share
                            </button>

                            <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full">
                                Save
                            </button>

                        </div>

                    </div>

                    {/* Description */}

                    <div className="bg-zinc-900 rounded-2xl mt-6 p-6">

                        <p className="text-gray-400">
                            {video.views} views •{" "}
                            {new Date(video.createdAt).toLocaleDateString()}
                        </p>

                        <p className="mt-4">
                            {video.description}
                        </p>

                    </div>

                    {/* Comments */}

                    <CommentList videoId={video._id} />

                </div>

                {/* Right Side */}

                <div className="hidden lg:block w-96">

                    <h2 className="text-xl font-semibold mb-4">
                        Recommended Videos
                    </h2>

                    <div className="space-y-4">

                        {recommendedVideos.length === 0 ? (
                            <p className="text-zinc-400">
                                No recommendations available.
                            </p>
                        ) : (
                            recommendedVideos.map((item) => (
                                <Link
                                    key={item._id}
                                    to={`/watch/${item._id}`}
                                    className="flex gap-3 hover:bg-zinc-900 rounded-lg p-2 transition"
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-40 h-24 object-cover rounded-lg"
                                    />

                                    <div className="flex-1">

                                        <h3 className="font-semibold line-clamp-2">
                                            {item.title}
                                        </h3>

                                        <p className="text-sm text-gray-400 mt-1">
                                            {item.owner?.username}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {item.views} views
                                        </p>

                                    </div>

                                </Link>
                            ))
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Watch;