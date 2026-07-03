import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import videoService from "../../services/video.service";

function VideoGrid() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await videoService.getAllVideos();

                if (response.success) {
                    console.log("Videos:", response.data);
                    setVideos(response.data);
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, []);

    if (videos.length === 0) {
        return (
            <div className="text-center text-white text-xl mt-10">
                No videos available
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
                <VideoCard
                    key={video._id}
                    video={video}
                />
            ))}
        </div>
    );
}

export default VideoGrid;