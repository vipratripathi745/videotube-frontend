import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import userService from "../services/user.service";
import videoService from "../services/video.service";
import VideoCard from "../components/video/VideoCard";
import SubscribeButton from "../components/subscription/SubscribeButton";

function Channel() {
    const { username } = useParams();

    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const profile =
                    await userService.getChannelProfile(username);

                if (profile.success) {
                    setChannel(profile.data);

                    const uploadedVideos =
                        await videoService.getUserVideos(
                            profile.data._id
                        );

                    if (uploadedVideos.success) {
                        setVideos(uploadedVideos.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchChannel();
    }, [username]);

    if (!channel) {
        return (
            <div className="flex-1 bg-zinc-950 text-white flex justify-center items-center min-h-screen">
                Loading...
            </div>
        );
    }

    return (
        <main className="flex-1 bg-zinc-950 min-h-screen">

            {/* Cover Image */}

            <div className="h-64 bg-zinc-800">

                {channel.coverImage && (
                    <img
                        src={channel.coverImage}
                        alt="cover"
                        className="w-full h-full object-cover"
                    />
                )}

            </div>

            <div className="max-w-7xl mx-auto px-8">

                <div className="flex items-center gap-6 -mt-16">

                    <img
                        src={channel.avatar}
                        alt={channel.username}
                        className="w-36 h-36 rounded-full border-4 border-zinc-950 object-cover"
                    />

                    <div>

                        <h1 className="text-4xl font-bold text-white">
                            {channel.fullName}
                        </h1>

                        <p className="text-gray-400 mt-2">
                            @{channel.username}
                        </p>

                        <p className="text-gray-400 mt-2">
                            {channel.subscribersCount} Subscribers
                        </p>

                    </div>

                    <div className="ml-auto">
                        <SubscribeButton
                            channelId={channel._id}
                        />
                    </div>

                </div>

                <h2 className="text-3xl text-white font-bold mt-14 mb-8">
                    Uploads
                </h2>

                {videos.length === 0 ? (
                    <div className="text-gray-400 text-center py-16">
                        No uploaded videos.
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

export default Channel;