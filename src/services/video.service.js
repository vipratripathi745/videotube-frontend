import api from "./api";

const videoService = {
    getAllVideos: async (query = "") => {
        const response = await api.get("/videos", {
            params: {
                query,
            },
        });

        return response.data;
    },

    getVideoById: async (videoId) => {
        const response = await api.get(`/videos/${videoId}`);
        return response.data;
    },

    getUserVideos: async (userId) => {
        const response = await api.get(
            `/videos/user/${userId}`
        );

        return response.data;
    },

    publishVideo: async (formData) => {
        const response = await api.post(
            "/videos/publish",
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

        return response.data;
    },

    updateVideo: async (videoId, formData) => {
        const response = await api.patch(
            `/videos/${videoId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    },

    deleteVideo: async (videoId) => {
        const response = await api.delete(
            `/videos/${videoId}`
        );

        return response.data;
    },

    togglePublish: async (videoId) => {
        const response = await api.patch(
            `/videos/toggle/publish/${videoId}`
        );

        return response.data;
    },
};

export default videoService;