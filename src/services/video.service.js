import api from "./api";

const videoService = {
    getAllVideos: async () => {
        const response = await api.get("/videos");
        return response.data;
    },

    getVideoById: async (videoId) => {
        const response = await api.get(`/videos/${videoId}`);
        return response.data;
    },
};

export default videoService;