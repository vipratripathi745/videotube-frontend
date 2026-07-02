import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import useAuthLoader from "./hooks/useAuthLoader";

function App() {
    useAuthLoader();

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="flex">
                <Sidebar />

                <AppRoutes />
            </div>
        </div>
    );
}

export default App;