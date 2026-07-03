import { useEffect, useState } from "react";
import likeService from "../services/like.service";
import VideoCard from "../components/video/VideoCard";

function LikedVideos() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchLikedVideos = async () => {
            try {
                const response =
                    await likeService.getLikedVideos();

                if (response.success) {
                    const liked =
                        response.data.map(
                            (item) => item.video
                        );

                    setVideos(liked);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchLikedVideos();
    }, []);

    return (
        <div className="flex-1 bg-zinc-950 min-h-screen p-8">

            <h1 className="text-3xl text-white font-bold mb-8">
                Liked Videos
            </h1>

            {videos.length === 0 ? (
                <p className="text-gray-400">
                    No liked videos yet.
                </p>
            ) : (
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {videos.map((video) => (
                        <VideoCard
                            key={video._id}
                            video={video}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

export default LikedVideos;