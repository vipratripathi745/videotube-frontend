import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import likeService from "../../services/like.service";

function LikeButton({ videoId, initialLikes = 0 }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);


    useEffect(() => {
        if (!user) return;

        const fetchLikeStatus = async () => {
            try {
                const result = await likeService.isVideoLiked(videoId);

                setLiked(result.liked);
                setLikes(result.likesCount);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLikeStatus();
    }, [videoId, user]);

    const handleLike = async () => {
        if (!user) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }       
              
        try {
            await likeService.toggleVideoLike(videoId);

            if (liked) {
                setLikes((prev) => prev - 1);
            } else {
                setLikes((prev) => prev + 1);
            }

            setLiked(!liked);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            onClick={handleLike}
            className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full transition"
        >
            {liked ? "❤️" : "👍"} {likes}
        </button>
    );
}

export default LikeButton;