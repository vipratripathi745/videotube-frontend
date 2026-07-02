import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
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