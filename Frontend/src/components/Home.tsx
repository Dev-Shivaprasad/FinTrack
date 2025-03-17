const Finance = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/path-to-your-image.png')" }}></div>
      <div className="relative text-center text-white px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Take Control of Your <span className="text-green-400">Finances</span> Today!
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Effortlessly track spending, achieve goals, and reduce financial stress with our intuitive budgeting app.
        </p>
        <a href = "/login" className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
        Get Started!</a>
      {/* <div className="flex items-center justify-center min-h-screen">
      <Link
        to = "/LoginPage"
        className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
      > Get Started </Link>
    </div> */}
      </div>
    </div>
  );
};
export default Finance;







