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
};

export default videoService;