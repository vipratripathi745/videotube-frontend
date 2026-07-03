import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import videoService from "../services/video.service";

function Watch() {
    const { videoId } = useParams();

    const [video, setVideo] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response =
                    await videoService.getVideoById(videoId);

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
            <div className="flex-1 flex items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex-1 bg-black text-white min-h-screen p-6">
            <video
                src={video.videoFile}
                controls
                className="w-full rounded-xl"
            />

            <h1 className="text-3xl font-bold mt-6">
                {video.title}
            </h1>

            <p className="text-gray-400 mt-2">
                {video.owner?.username || "Unknown Channel"}
            </p>

            <p className="text-gray-500 mt-2">
                {video.views} views
            </p>

            <p className="text-gray-300 mt-6">
                {video.description}
            </p>
        </div>
    );
}

export default Watch;