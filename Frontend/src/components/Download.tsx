import { motion } from "motion/react";
import Button from "./Button";
const Download = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-background p-10 rounded-2xl shadow-xl max-w-3xl w-full text-center"
      >
        <h2 className="text-3xl font-bold text-primary font-Heading">
          Register and Start Saving Today!
        </h2>
        <p className=" mt-3">
          Take control of your finances and start saving today.
          <br/>
          Enjoy reduced stress, increased savings, and financial freedom.
        </p>
        <Button title="Let's Go" className="font-Heading mt-3" link="/auth" />
      </motion.div>
    </div>
  );
};
export default Download;
