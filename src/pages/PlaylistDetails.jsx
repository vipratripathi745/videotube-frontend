import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import playlistService from "../services/playlist.service";
import VideoCard from "../components/video/VideoCard";

function PlaylistDetails() {
    const { playlistId } = useParams();

    const [playlist, setPlaylist] = useState(null);

    const fetchPlaylist = async () => {
        try {
            const response =
                await playlistService.getPlaylistById(
                    playlistId
                );

            if (response.success) {
                setPlaylist(response.data);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to load playlist"
            );
        }
    };

    useEffect(() => {
        fetchPlaylist();
    }, [playlistId]);

    if (!playlist) {
        return (
            <div className="flex-1 flex justify-center items-center bg-zinc-950 text-white min-h-screen">
                Loading...
            </div>
        );
    }

    return (
        <main className="flex-1 bg-zinc-950 min-h-screen px-8 py-8">

            <div className="max-w-screen-2xl mx-auto">

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-white">
                        {playlist.name}
                    </h1>

                    <p className="text-gray-400 mt-3">
                        {playlist.description}
                    </p>

                    <p className="text-gray-500 mt-3">
                        {playlist.videos.length} Videos
                    </p>

                </div>

                {playlist.videos.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        No videos in this playlist.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                        {playlist.videos.map((video) => (
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

export default PlaylistDetails;