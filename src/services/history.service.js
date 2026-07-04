import api from "./api";

const historyService = {
    addToHistory: async (videoId) => {
        const response = await api.post(
            `/history/${videoId}`
        );

        return response.data;
    },

    getHistory: async () => {
        const response = await api.get(
            "/history"
        );

        return response.data;
    },

    clearHistory: async () => {
        const response = await api.delete(
            "/history"
        );

        return response.data;
    },
};

export default historyService;