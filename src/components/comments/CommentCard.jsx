function CommentCard({ comment }) {
    return (
        <div className="flex gap-4 p-4 border-b border-zinc-800">
            <img
                src={
                    comment.owner?.avatar ||
                    "https://via.placeholder.com/40"
                }
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex-1">
                <h3 className="text-white font-semibold">
                    {comment.owner?.username || "Unknown User"}
                </h3>

                <p className="text-gray-300 mt-1">
                    {comment.content}
                </p>

                <p className="text-gray-500 text-sm mt-2">
                    {new Date(comment.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}

export default CommentCard;