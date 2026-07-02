import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import authService from "../../services/auth.service";

function RegisterForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
    console.log("SUBMIT CLICKED");
    console.log(data);

    try {
        const formData = new FormData();

        formData.append("fullName", data.fullName);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);

        formData.append("avatar", data.avatar[0]);

        if (data.coverImage?.length > 0) {
            formData.append("coverImage", data.coverImage[0]);
        }

        console.log("Sending request...");

        const response = await authService.register(formData);

        console.log(response);

        if (response.success) {
            toast.success("Registration successful");
            navigate("/login");
        }
    } catch (error) {
        console.log(error);

        toast.error(
            error.response?.data?.message ||
            error.message ||
            "Registration failed"
        );
    }
};

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <input
                type="text"
                placeholder="Full Name"
                {...register("fullName", {
                    required: true,
                })}
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
            />

            <input
                type="text"
                placeholder="Username"
                {...register("username", {
                    required: true,
                })}
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
            />

            <input
                type="email"
                placeholder="Email"
                {...register("email", {
                    required: true,
                })}
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
            />

            <input
                type="password"
                placeholder="Password"
                {...register("password", {
                    required: true,
                })}
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
            />

            <input
                type="file"
                accept="image/*"
                {...register("avatar", {
                    required: true,
                })}
                className="w-full text-white"
            />

            <input
                type="file"
                accept="image/*"
                {...register("coverImage")}
                className="w-full text-white"
            />

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg text-white font-semibold"
            >
                {isSubmitting ? "Registering..." : "Register"}
            </button>
        </form>
    );
}

export default RegisterForm;