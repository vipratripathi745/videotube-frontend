function Register() {
    return (
        <div className="flex-1 flex items-center justify-center bg-black">
            <div className="w-full max-w-md bg-zinc-900 p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    Register
                </h1>

                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none"
                    />

                    <button
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;