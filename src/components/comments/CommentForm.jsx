import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

function CommentForm({ onSubmit }) {
    const [content, setContent] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        if (!content.trim()) return;

        onSubmit(content);

        setContent("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6"
        >
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment..."
                rows="3"
                className="w-full bg-zinc-900 text-white rounded-lg p-4 outline-none border border-zinc-700 resize-none"
            />

            <div className="flex justify-end mt-3">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-semibold"
                >
                    Comment
                </button>
            </div>
        </form>
    );
}

export default CommentForm;