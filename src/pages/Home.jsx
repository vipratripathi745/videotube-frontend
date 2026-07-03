import VideoGrid from "../components/video/VideoGrid";

function Home() {
    return (
        <main className="flex-1 bg-zinc-950 min-h-screen px-8 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">
                    Recommended Videos
                </h1>

                <VideoGrid />
            </div>
        </main>
    );
}

export default Home;