import Header from "../components/Header";
export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-gray-100 py-10 min-h-screen lg:bg-home lg:bg-home-xl bg-no-repeat bg-right-top">
        <div className="max-w-5xl mx-auto mt-10">
          <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
            <h1 className="text-6xl font-black">
              All your <span className="text-cyan-400">Social Media</span> in a
              single link
            </h1>
            <p className="text-slate-800 text-xl">
              Join more thatn 200 thousand developers sharing their social
              media, share your TikTok, Facebook, Instagram, YouTube, Github and
              more
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
