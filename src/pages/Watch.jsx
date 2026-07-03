import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentList from "../components/comments/CommentList";

import videoService from "../services/video.service";

function Watch() {
    const { videoId } = useParams();

    const [video, setVideo] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await videoService.getVideoById(videoId);

                if (response.success) {
                    setVideo(response.data);
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
        <div className="flex-1 bg-black text-white min-h-screen">
            <div className="max-w-7xl mx-auto p-6">

                {/* Video */}
                <video
                    src={video.videoFile}
                    controls
                    className="w-full rounded-xl"
                />

                {/* Title */}
                <h1 className="text-3xl font-bold mt-6">
                    {video.title}
                </h1>

                {/* Channel + Buttons */}
                <div className="flex justify-between items-center mt-6 flex-wrap gap-4">

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

                        <button
                            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full font-semibold"
                        >
                            Subscribe
                        </button>

                    </div>

                    <div className="flex gap-3">

                        <button className="bg-zinc-800 px-4 py-2 rounded-full">
                            👍 {video.views}
                        </button>

                        <button className="bg-zinc-800 px-4 py-2 rounded-full">
                            Share
                        </button>

                        <button className="bg-zinc-800 px-4 py-2 rounded-full">
                            Save
                        </button>

                    </div>

                </div>

                {/* Description */}

                <div className="bg-zinc-900 rounded-xl mt-6 p-5">

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
        </div>
    );
}

export default Watch;