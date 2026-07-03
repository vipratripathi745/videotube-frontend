import { useEffect, useState } from "react";

import commentService from "../../services/comment.service";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

function CommentList({ videoId }) {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const response = await commentService.getComments(videoId);

            if (response.success) {
                setComments(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [videoId]);

    const handleAddComment = async (content) => {
        try {
            const response = await commentService.addComment(
                videoId,
                content
            );

            if (response.success) {
                fetchComments();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold text-white mb-5">
                Comments
            </h2>

            <CommentForm onSubmit={handleAddComment} />

            <div className="mt-8">
                {comments.length === 0 ? (
                    <p className="text-gray-400">
                        No comments yet.
                    </p>
                ) : (
                    comments.map((comment) => (
                        <CommentCard
                            key={comment._id}
                            comment={comment}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default CommentList;