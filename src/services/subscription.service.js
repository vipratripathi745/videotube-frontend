import api from "./api";

const subscriptionService = {
    toggleSubscription: async (channelId) => {
        const response = await api.post(
            `/subscriptions/c/${channelId}`
        );

        return response.data;
    },

    getChannelSubscribers: async (channelId) => {
        const response = await api.get(
            `/subscriptions/user/${channelId}`
        );

        return response.data;
    },

    getSubscribedChannels: async (subscriberId) => {
        const response = await api.get(
            `/subscriptions/subscribed/${subscriberId}`
        );

        return response.data;
    },
};

export default subscriptionService;