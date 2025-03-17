import Button from "./Button";
import Heading from "./Heading";
const Finance = () => {
  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 bg-[url('Logo/Landing-page.jpg')]"></div>
        <div className="relative text-center px-6 md:px-12">
          <Heading Data="Take Control of Your Finances Today!" />
          <p className="text-lg md:text-xl mb-6">
            Effortlessly track spending, achieve goals, and reduce financial
            stress with our intuitive budgeting app.
          </p>
          <a href="#nxt">
            <Button title="Know More" />
          </a>
          {/* <div className="flex items-center justify-center min-h-screen">
      <Link
      to = "/LoginPage"
      className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
      > Get Started </Link>
      </div> */}
        </div>
      </div>
    </>
  );
};
export default Finance;
