import RegisterForm from "../components/forms/RegisterForm";

function Register() {
    return (
        <div className="flex-1 flex items-center justify-center bg-black">
            <div className="w-full max-w-md bg-zinc-900 p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    Register
                </h1>

                <RegisterForm />
            </div>
        </div>
    );
}

export default Register;