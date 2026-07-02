import { useEffect } from "react";
import authService from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

function useAuthLoader() {
    const { login } = useAuth();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await authService.getCurrentUser();

                if (response.success) {
                    login(response.data);
                }
            } catch (error) {
                console.log("No user logged in");
            }
        };

        loadUser();
    }, []);

}

export default useAuthLoader;