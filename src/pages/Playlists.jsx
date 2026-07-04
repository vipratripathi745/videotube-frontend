import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import playlistService from "../services/playlist.service";
import { useAuth } from "../context/AuthContext";

function Playlists() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [playlists, setPlaylists] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const fetchPlaylists = async () => {
        if (!user) return;

        try {
            const response =
                await playlistService.getUserPlaylists(
                    user._id
                );

            if (response.success) {
                setPlaylists(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, [user]);

    const handleCreate = async () => {
        if (!name.trim()) {
            toast.error("Playlist name is required");
            return;
        }

        try {
            const response =
                await playlistService.createPlaylist({
                    name,
                    description,
                });

            toast.success(response.message);

            setName("");
            setDescription("");

            fetchPlaylists();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to create playlist"
            );
        }
    };

    const handleDelete = async (playlistId) => {
        try {
            const response =
                await playlistService.deletePlaylist(
                    playlistId
                );

            toast.success(response.message);

            fetchPlaylists();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to delete playlist"
            );
        }
    };

    if (!user) {
        return (
            <div className="flex-1 flex items-center justify-center bg-zinc-950 text-white min-h-screen">
                Please login to view your playlists.
            </div>
        );
    }

    return (
        <main className="flex-1 bg-zinc-950 min-h-screen px-8 py-8">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-bold text-white mb-8">
                    My Playlists
                </h1>

                <div className="bg-zinc-900 rounded-2xl p-6 mb-10">

                    <input
                        type="text"
                        placeholder="Playlist Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        className="w-full bg-zinc-800 text-white p-3 rounded-lg mb-4"
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        className="w-full bg-zinc-800 text-white p-3 rounded-lg mb-4"
                    />

                    <button
                        onClick={handleCreate}
                        className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg text-white font-semibold"
                    >
                        Create Playlist
                    </button>

                </div>

                {playlists.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        No playlists created.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {playlists.map((playlist) => (

                            <div
                                key={playlist._id}
                                className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
                            >

                                <h2 className="text-2xl font-bold text-white">
                                    {playlist.name}
                                </h2>

                                <p className="text-gray-400 mt-2">
                                    {playlist.description}
                                </p>

                                <p className="text-gray-500 mt-3">
                                    {playlist.videos.length} Videos
                                </p>

                                <div className="flex gap-4 mt-6">

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/playlist/${playlist._id}`
                                            )
                                        }
                                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                                    >
                                        Open
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                playlist._id
                                            )
                                        }
                                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>
        </main>
    );
}

export default Playlists;