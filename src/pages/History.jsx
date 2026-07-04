import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import historyService from "../services/history.service";
import VideoCard from "../components/video/VideoCard";

function History() {
    const [videos, setVideos] = useState([]);

    const fetchHistory = async () => {
        try {
            const response =
                await historyService.getHistory();

            if (response.success) {
                setVideos(
                    response.data.map(
                        (item) => item.video
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleClear = async () => {
        try {
            const response =
                await historyService.clearHistory();

            toast.success(response.message);

            setVideos([]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="flex-1 bg-zinc-950 min-h-screen px-8 py-8">
            <div className="max-w-screen-2xl mx-auto">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold text-white">
                            History
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Videos you've watched.
                        </p>

                    </div>

                    {videos.length > 0 && (
                        <button
                            onClick={handleClear}
                            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white"
                        >
                            Clear History
                        </button>
                    )}

                </div>

                {videos.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        No history available.
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

export default History;