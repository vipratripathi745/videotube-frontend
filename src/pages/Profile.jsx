import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/user.service";
import videoService from "../services/video.service";
import VideoCard from "../components/video/VideoCard";

function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let userResponse;

                if (username) {
                    userResponse =
                        await userService.getChannelProfile(
                            username
                        );
                } else {
                    userResponse =
                        await userService.getCurrentUser();
                }

                if (userResponse.success) {
                    setUser(userResponse.data);

                    const videoResponse =
                        await videoService.getUserVideos(
                            userResponse.data._id
                        );

                    if (videoResponse.success) {
                        setVideos(videoResponse.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, [username]);

    if (!user) {
        return (
            <div className="flex-1 flex justify-center items-center bg-black text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex-1 bg-black text-white min-h-screen">

            <img
                src={
                    user.coverImage ||
                    "https://via.placeholder.com/1200x300"
                }
                alt="cover"
                className="w-full h-64 object-cover"
            />

            <div className="max-w-7xl mx-auto p-8">

                <div className="flex items-center gap-6">

                    <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-32 h-32 rounded-full border-4 border-black"
                    />

                    <div>

                        <h1 className="text-4xl font-bold">
                            {user.fullName}
                        </h1>

                        <p className="text-gray-400">
                            @{user.username}
                        </p>

                        <p className="text-gray-500">
                            {user.email}
                        </p>

                    </div>

                </div>

                <h2 className="text-2xl font-bold mt-12 mb-6">
                    Uploaded Videos
                </h2>

                {videos.length === 0 ? (
                    <p className="text-gray-500">
                        No uploaded videos
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video) => (
                            <VideoCard
                                key={video._id}
                                video={video}
                            />
                        ))}
                    </div>
                )}

            </div>

        </div>
    );
}

export default Profile;