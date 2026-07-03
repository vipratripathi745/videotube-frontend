import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import subscriptionService from "../services/subscription.service";
import { useAuth } from "../context/AuthContext";

function Subscriptions() {
    const { user } = useAuth();
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response =
                    await subscriptionService.getSubscribedChannels(
                        user._id
                    );

                if (response.success) {
                    setChannels(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (user) {
            fetchSubscriptions();
        }
    }, [user]);

    return (
        <div className="flex-1 bg-zinc-950 min-h-screen p-8">

            <h1 className="text-3xl font-bold text-white mb-8">
                Subscriptions
            </h1>

            {channels.length === 0 ? (
                <p className="text-gray-400">
                    You haven't subscribed to any channels yet.
                </p>
            ) : (
                <div className="space-y-4">

                    {channels.map((item) => (
                        <div
                            key={item._id}
                            className="bg-zinc-900 rounded-xl p-4 flex items-center gap-4"
                        >
                            <img
                                src={item.channel.avatar}
                                alt={item.channel.username}
                                className="w-14 h-14 rounded-full"
                            />

                            <div className="flex-1">
                                <h2 className="text-white font-semibold">
                                    {item.channel.username}
                                </h2>

                                <p className="text-gray-400">
                                    {item.channel.fullName}
                                </p>
                            </div>

                            <Link
                                to={`/profile/${item.channel.username}`}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                            >
                                View Profile
                            </Link>
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default Subscriptions;