import { motion } from "motion/react";
import Button from "./Button";
import { Vibrate } from "./utils/Helperfunction";
import { landing } from "./utils/Landingpagemedia";
const Finance = () => {
  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center bg-black ">
        <div className="absolute inset-0 bg-cover bg-black opacity-30">
          <video
            src={landing}
            className="w-full h-screen object-cover"
            loop
            autoPlay
            muted
          />
        </div>
        <div className="relative text-center px-6 md:px-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="text-6xl font-Heading text-white">
              Take Control of Your{" "}
              <span className="text-primary">Finances </span>
              Today!
            </div>
            <p className="text-lg md:text-xl mb-6 text-wrap mt-3 text-white ">
              Effortlessly track spending, achieve goals, and reduce financial
              stress with our intuitive budgeting app.
            </p>
          </motion.div>
          <div className="flex w-full justify-around items-center">
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => Vibrate()}
              href="#nxt"
            >
              <Button title="Know More" />
            </motion.a>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => Vibrate()}
            >
              <Button
                title="Get Started"
                className="font-Heading"
                link="/auth"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Finance;
