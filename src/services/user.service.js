import api from "./api";

const userService = {
    getCurrentUser: async () => {
        const response = await api.get(
            "/users/current-user"
        );

        return response.data;
    },

    getChannelProfile: async (username) => {
        const response = await api.get(
            `/users/channel/${username}`
        );

        return response.data;
    },

    updateAccount: async (data) => {
        const response = await api.patch(
            "/users/update-account",
            data
        );

        return response.data;
    },

    updateAvatar: async (formData) => {
        const response = await api.patch(
            "/users/avatar",
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

    updateCoverImage: async (formData) => {
        const response = await api.patch(
            "/users/cover-image",
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

export default userService;