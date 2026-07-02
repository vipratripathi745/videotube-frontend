import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import authService from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await authService.login(data);

            if (response.success) {
                login(response.data.user);

                toast.success("Login successful");

                navigate("/");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <input
                type="email"
                placeholder="Email"
                {...register("email", {
                    required: true,
                })}
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none"
            />

            <input
                type="password"
                placeholder="Password"
                {...register("password", {
                    required: true,
                })}
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none"
            />

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
                {isSubmitting ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}

export default LoginForm;