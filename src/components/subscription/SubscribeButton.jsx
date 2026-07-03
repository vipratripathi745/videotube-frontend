import { useEffect, useState } from "react";
import subscriptionService from "../../services/subscription.service";

function SubscribeButton({ channelId }) {
    const [subscribed, setSubscribed] = useState(false);
    const [subscriberCount, setSubscriberCount] = useState(0);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response =
                    await subscriptionService.getChannelSubscribers(
                        channelId
                    );

                if (response.success) {
                    setSubscriberCount(response.data.length);

                    const currentUser = JSON.parse(
                        localStorage.getItem("user")
                    );

                    if (currentUser) {
                        const isSubscribed =
                            response.data.some(
                                (subscription) =>
                                    subscription.subscriber?._id ===
                                    currentUser._id
                            );

                        setSubscribed(isSubscribed);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (channelId) {
            fetchSubscribers();
        }
    }, [channelId]);

    const handleSubscribe = async () => {
        try {
            await subscriptionService.toggleSubscription(
                channelId
            );

            if (subscribed) {
                setSubscriberCount((prev) => prev - 1);
            } else {
                setSubscriberCount((prev) => prev + 1);
            }

            setSubscribed(!subscribed);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            onClick={handleSubscribe}
            className={`px-5 py-2 rounded-full font-semibold transition ${
                subscribed
                    ? "bg-zinc-700 hover:bg-zinc-600"
                    : "bg-red-600 hover:bg-red-700"
            }`}
        >
            {subscribed
                ? `Subscribed (${subscriberCount})`
                : `Subscribe (${subscriberCount})`}
        </button>
    );
}

export default SubscribeButton;