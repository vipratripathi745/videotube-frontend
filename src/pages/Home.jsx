import VideoGrid from "../components/video/VideoGrid";

function Home() {
    return (
        <main className="flex-1 bg-zinc-950 min-h-screen px-8 py-8">
            <div className="max-w-screen-2xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Recommended
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Discover trending videos from creators around the world.
                    </p>
                </div>

                <VideoGrid />

            </div>
        </main>
    );
}

export default Home;