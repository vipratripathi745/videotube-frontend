import api from "./api";

const authService = {
    register: async (formData) => {
        const response = await api.post(
            "/users/register",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    },

    login: async (data) => {
        const response = await api.post(
            "/users/login",
            data
        );

        return response.data;
    },

    logout: async () => {
        const response = await api.post(
            "/users/logout"
        );

        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get(
            "/users/current-user"
        );

        return response.data;
    },
};

export default authService;