import { useEffect, useState } from "react";

import watchLaterService from "../services/watchLater.service";
import VideoCard from "../components/video/VideoCard";

function WatchLater() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWatchLater = async () => {
            try {
                const response =
                    await watchLaterService.getWatchLaterVideos();

                if (response.success) {
                    setVideos(
                        response.data.map((item) => item.video)
                    );
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchWatchLater();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-zinc-950 text-white min-h-screen">
                Loading...
            </div>
        );
    }

    return (
        <main className="flex-1 bg-zinc-950 min-h-screen px-8 py-8">
            <div className="max-w-screen-2xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Watch Later
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Videos you've saved to watch later.
                    </p>
                </div>

                {videos.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        No videos saved yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {videos.map((video) => (
                            <VideoCard
                                key={video._id}
                                video={video}
                            />
                        ))}
                    </div>
                )}

            </div>
        </main>
    );
}

export default WatchLater;