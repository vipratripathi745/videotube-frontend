import { useEffect, useState } from "react";
import dashboardService from "../services/dashboard.service";
import videoService from "../services/video.service";
import toast from "react-hot-toast";
import EditVideoModal from "../components/dashboard/EditVideoModal";
import {
    FiVideo,
    FiEye,
    FiHeart,
    FiUsers,
    FiUserPlus,
} from "react-icons/fi";

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [videos, setVideos] = useState([]);
    const [editingVideo, setEditingVideo] = useState(null);


    const fetchVideos = async () => {
        try {
            const response = await dashboardService.getVideos();

            if (response.success) {
                setVideos(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const statsResponse =
                    await dashboardService.getStats();

                if (statsResponse.success) {
                    setStats(statsResponse.data);
                }

                await fetchVideos();

            } catch (error) {
                console.log(error);
            }
        };

        fetchDashboard();
    }, []);

    if (!stats) {
        return (
            <div className="flex-1 flex justify-center items-center bg-black text-white">
                Loading...
            </div>
        );
    }


    const handleDelete = async (videoId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this video?"
        );

        if (!confirmed) return;

        try {
            const response = await videoService.deleteVideo(videoId);

            if (response.success) {
                toast.success("Video deleted successfully");

                await fetchVideos();
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete video"
            );
        }
    };

    const handleTogglePublish = async (videoId) => {
        try {
            const response =
                await videoService.togglePublish(videoId);

            if (response.success) {
                toast.success(response.message);

                await fetchVideos();
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update publish status"
            );
        }
    };

    const handleUpdate = async (
        videoId,
        formData
    ) => {
        try {
            const response =
                await videoService.updateVideo(
                    videoId,
                    formData
                );

            if (response.success) {
                toast.success(
                    "Video updated successfully"
                );

                await fetchVideos();
                setEditingVideo(null);
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Update failed"
            );
        }
    };



    return (
        <div className="flex-1 bg-black text-white min-h-screen p-8">

            <h1 className="text-4xl font-bold mb-10">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">

                <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-6 shadow-lg">
                    <FiVideo size={32} className="mb-3" />
                    <p className="text-red-100">Total Videos</p>
                    <h2 className="text-4xl font-bold mt-2">
                        {stats.totalVideos}
                    </h2>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 shadow-lg">
                    <FiEye size={32} className="mb-3" />
                    <p className="text-blue-100">Total Views</p>
                    <h2 className="text-4xl font-bold mt-2">
                        {stats.totalViews}
                    </h2>
                </div>

                <div className="bg-gradient-to-r from-pink-600 to-rose-500 rounded-2xl p-6 shadow-lg">
                    <FiHeart size={32} className="mb-3" />
                    <p className="text-pink-100">Total Likes</p>
                    <h2 className="text-4xl font-bold mt-2">
                        {stats.totalLikes}
                    </h2>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-6 shadow-lg">
                    <FiUsers size={32} className="mb-3" />
                    <p className="text-green-100">Subscribers</p>
                    <h2 className="text-4xl font-bold mt-2">
                        {stats.totalSubscribers}
                    </h2>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-violet-500 rounded-2xl p-6 shadow-lg">
                    <FiUserPlus size={32} className="mb-3" />
                    <p className="text-purple-100">Subscribed To</p>
                    <h2 className="text-4xl font-bold mt-2">
                        {stats.totalSubscribedTo}
                    </h2>
                </div>

            </div>

            <h2 className="text-2xl font-bold mb-6">
                My Videos
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full border-separate border-spacing-y-3">

                    <thead>

                        <tr className="bg-zinc-900">

                            <th className="p-4 text-left">
                                Thumbnail
                            </th>

                            <th className="p-4 text-left">
                                Title
                            </th>

                            <th className="p-4 text-center">
                                Views
                            </th>

                            <th className="p-4 text-center">
                                Published
                            </th>

                            <th className="p-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {videos.map((video) => (

                            <tr
                                key={video._id}
                                className="bg-zinc-900 hover:bg-zinc-800 transition duration-300 rounded-xl shadow-md"
                            >

                                <td className="p-4">

                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-36 h-20 object-cover rounded-xl shadow-lg hover:scale-105 transition"

                                    />

                                </td>

                                <td className="p-4 font-semibold">
                                    {video.title}
                                </td>

                                <td className="p-4 text-center">
                                    {video.views}
                                </td>

                                <td className="p-4 text-center">

                                    <button
                                        onClick={() =>
                                            handleTogglePublish(video._id)
                                        }
                                        className={`px-4 py-2 rounded-full font-semibold transition ${
                                            video.isPublished
                                                ? "bg-green-500 hover:bg-green-600"
                                                : "bg-yellow-500 hover:bg-yellow-600"
                                        }`}
                                    >
                                        {video.isPublished
                                            ? "Published"
                                            : "Unpublished"}
                                    </button>

                                </td>





                                <td className="p-4 text-center">

                                    <button
                                        onClick={() =>
                                            setEditingVideo(video)
                                        }
                                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(video._id)}
                                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow transition"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {editingVideo && (
                <EditVideoModal
                    video={editingVideo}
                    onClose={() =>
                        setEditingVideo(null)
                    }
                    onSave={handleUpdate}
                />
            )}

        </div>
    );
}

export default Dashboard;