import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import useAuthLoader from "./hooks/useAuthLoader";

function App() {
    useAuthLoader();

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="flex">
                <Sidebar />

                <div className="flex-1 overflow-auto">
                    <AppRoutes />
                </div>
            </div>
        </div>
    );
}

export default App;