import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import watchLaterService from "../../services/watchLater.service";

function SaveButton({ videoId }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!user) return;

        const fetchStatus = async () => {
            try {
                const result =
                    await watchLaterService.getWatchLaterStatus(
                        videoId
                    );

                setSaved(result.saved);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStatus();
    }, [videoId, user]);

    const handleSave = async () => {
        if (!user) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        try {
            const response =
                await watchLaterService.toggleWatchLater(
                    videoId
                );

            toast.success(response.message);

            setSaved(!saved);
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                    "Something went wrong"
            );
        }
    };

    return (
        <button
            onClick={handleSave}
            className="bg-zinc-800 hover:bg-zinc-700 transition px-5 py-2 rounded-full font-medium"
        >
            {saved ? "Saved" : "Save"}
        </button>
    );
}

export default SaveButton;