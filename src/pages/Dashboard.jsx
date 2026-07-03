import { useEffect, useState } from "react";
import dashboardService from "../services/dashboard.service";
import videoService from "../services/video.service";
import toast from "react-hot-toast";
import EditVideoModal from "../components/dashboard/EditVideoModal";

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                <div className="bg-zinc-900 p-6 rounded-xl">
                    <h2 className="text-gray-400">
                        Total Videos
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        {stats.totalVideos}
                    </p>
                </div>

                <div className="bg-zinc-900 p-6 rounded-xl">
                    <h2 className="text-gray-400">
                        Subscribers
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        {stats.totalSubscribers}
                    </p>
                </div>

                <div className="bg-zinc-900 p-6 rounded-xl">
                    <h2 className="text-gray-400">
                        Subscribed To
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        {stats.totalSubscribedTo}
                    </p>
                </div>

            </div>

            <h2 className="text-2xl font-bold mb-6">
                My Videos
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

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
                                className="border-b border-zinc-800 hover:bg-zinc-900"
                            >

                                <td className="p-4">

                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-28 h-16 object-cover rounded"
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
                                        className={`px-3 py-1 rounded font-semibold ${
                                            video.isPublished
                                                ? "bg-green-600 hover:bg-green-700"
                                                : "bg-yellow-600 hover:bg-yellow-700"
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
                                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(video._id)}
                                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
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