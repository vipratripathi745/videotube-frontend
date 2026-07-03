import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import videoService from "../services/video.service";

function Upload() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("videoFile", data.videoFile[0]);
            formData.append("thumbnail", data.thumbnail[0]);

            const response =
                await videoService.publishVideo(formData);

            if (response.success) {
                toast.success("Video uploaded successfully");
                navigate("/");
            }
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Video upload failed"
            );
        }
    };

    return (
        <div className="flex-1 bg-black text-white min-h-screen p-8">
            <div className="max-w-2xl mx-auto bg-zinc-900 rounded-xl p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Upload Video
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <input
                        type="text"
                        placeholder="Video Title"
                        {...register("title", {
                            required: true,
                        })}
                        className="w-full bg-zinc-800 p-3 rounded-lg"
                    />

                    <textarea
                        rows={5}
                        placeholder="Description"
                        {...register("description", {
                            required: true,
                        })}
                        className="w-full bg-zinc-800 p-3 rounded-lg"
                    />

                    <div>
                        <label className="block mb-2">
                            Select Video
                        </label>

                        <input
                            type="file"
                            accept="video/*"
                            {...register("videoFile", {
                                required: true,
                            })}
                        />
                    </div>

                    <div>
                        <label className="block mb-2">
                            Select Thumbnail
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            {...register("thumbnail", {
                                required: true,
                            })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold"
                    >
                        {isSubmitting
                            ? "Uploading..."
                            : "Upload Video"}
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Upload;