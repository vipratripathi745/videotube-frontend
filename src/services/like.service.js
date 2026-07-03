import api from "./api";

const likeService = {
    toggleVideoLike: async (videoId) => {
        const response = await api.post(
            `/likes/toggle/v/${videoId}`
        );

        return response.data;
    },

    getLikedVideos: async () => {
        const response = await api.get(
            "/likes/videos"
        );

        return response.data;
    },

    isVideoLiked: async (videoId) => {
        const response = await api.get(
            `/likes/status/${videoId}`
        );

        return response.data.data;
    },
};

export default likeService;