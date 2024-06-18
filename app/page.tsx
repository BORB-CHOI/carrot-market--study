export default function Home() {
  return (
    <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg w-full max-w-screen-sm rounded-3xl p-5 flex flex-col gap-4">
        <div className="flex flex-col *:transition-all group">
          <input
            className="bg-gray-100"
            placeholder="Write your email"
            required
          />
          <span className="group-focus-within:block hidden">
            Make sure it is a valid email...
          </span>
          <button>Submit</button>
        </div>
      </div>
    </main>
  );
}
