import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import playlistService from "../../services/playlist.service";

function PlaylistModal({
    videoId,
    isOpen,
    onClose,
}) {
    const { user } = useAuth();

    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen || !user) return;

        const fetchPlaylists = async () => {
            try {
                const response =
                    await playlistService.getMyPlaylists(
                        user._id
                    );

                if (response.success) {
                    setPlaylists(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchPlaylists();
    }, [isOpen, user]);

    const handleAdd = async (playlistId) => {
        try {
            setLoading(true);

            const response =
                await playlistService.addVideoToPlaylist(
                    playlistId,
                    videoId
                );

            toast.success(response.message);

            onClose();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to add video"
            );
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="bg-zinc-900 rounded-2xl w-full max-w-md p-6">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold text-white">
                        Add to Playlist
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-white text-xl"
                    >
                        ✕
                    </button>

                </div>

                {playlists.length === 0 ? (

                    <p className="text-gray-400">
                        No playlists found.
                    </p>

                ) : (

                    <div className="space-y-3">

                        {playlists.map((playlist) => (

                            <button
                                key={playlist._id}
                                disabled={loading}
                                onClick={() =>
                                    handleAdd(
                                        playlist._id
                                    )
                                }
                                className="w-full text-left bg-zinc-800 hover:bg-zinc-700 p-4 rounded-xl transition"
                            >

                                <h3 className="text-white font-semibold">
                                    {playlist.name}
                                </h3>

                                <p className="text-sm text-gray-400">
                                    {playlist.videos.length} Videos
                                </p>

                            </button>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default PlaylistModal;