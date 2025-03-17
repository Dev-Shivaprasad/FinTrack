
import { motion } from "motion/react";
const Download = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2C4D44] p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#F8FAF7] p-10 rounded-2xl shadow-xl max-w-3xl w-full text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800">
          Download and Start Saving Today!
        </h2>
        <p className="text-gray-600 mt-3">
          Take control of your finances and start saving today.
        </p>
        <p className="text-gray-600">
          Enjoy reduced stress, increased savings, and financial freedom.
        </p>
      </motion.div>
    </div>
  );
};
export default Download;
