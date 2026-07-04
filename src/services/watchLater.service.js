import api from "./api";

const watchLaterService = {
    toggleWatchLater: async (videoId) => {
        const response = await api.post(
            `/watchlater/toggle/${videoId}`
        );

        return response.data;
    },

    getWatchLaterVideos: async () => {
        const response = await api.get(
            "/watchlater"
        );

        return response.data;
    },

    getWatchLaterStatus: async (videoId) => {
        const response = await api.get(
            `/watchlater/status/${videoId}`
        );

        return response.data.data;
    },
};

export default watchLaterService;