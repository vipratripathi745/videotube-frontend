import { useState } from "react";

function EditVideoModal({
    video,
    onClose,
    onSave,
}) {
    const [title, setTitle] = useState(video.title);
    const [description, setDescription] = useState(
        video.description
    );
    const [thumbnail, setThumbnail] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append(
            "description",
            description
        );

        if (thumbnail) {
            formData.append(
                "thumbnail",
                thumbnail
            );
        }

        onSave(video._id, formData);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-zinc-900 rounded-xl w-full max-w-lg p-6">

                <h2 className="text-2xl font-bold mb-6 text-white">
                    Edit Video
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        className="w-full bg-zinc-800 p-3 rounded text-white"
                    />

                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                        className="w-full bg-zinc-800 p-3 rounded text-white"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setThumbnail(
                                e.target.files[0]
                            )
                        }
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-zinc-700 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-600 rounded"
                        >
                            Save
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditVideoModal;