import { useEffect, useState } from "react";
import likeService from "../../services/like.service";

function LikeButton({ videoId, initialLikes = 0 }) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
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
    }, [videoId]);

    const handleLike = async () => {
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