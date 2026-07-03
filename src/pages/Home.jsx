import { useSearchParams } from "react-router-dom";
import VideoGrid from "../components/video/VideoGrid";

function Home() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("query") || "";

    return (
        <div className="flex-1 bg-black min-h-screen p-6">
            <VideoGrid query={query} />
        </div>
    );
}

export default Home;