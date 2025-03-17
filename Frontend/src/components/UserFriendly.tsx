import { Layout, Navigation, Accessibility } from "lucide-react";
import { motion } from "motion/react";

const features = [
  { title: "Clean Interface", icon: Layout },
  { title: "Intuitive Navigation", icon: Navigation },
  { title: "Accessibility Features", icon: Accessibility },
];
const UserFriendly = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2C4D44] p-6">
      <div className="bg-[#F8FAF7] p-10 rounded-2xl shadow-xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          User-Friendly Design and Accessibility
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Our app is committed to user-friendly design.
        </p>
        <p className="text-gray-600 text-center">
          {" "}
          Enjoy a clean interface, intuitive navigation, and visually appealing
          aesthetics.
        </p>
        <div className="relative mt-10 flex flex-col items-center">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gray-300"></div>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-center w-full max-w-lg relative"
              >
                {index % 2 === 0 ? (
                  <div className="w-1/2 text-right pr-6 text-gray-800 font-medium">
                    {feature.title}
                  </div>
                ) : (
                  <div className="w-1/2"></div>
                )}
                <div className="w-14 h-14 flex items-center justify-center bg-gray-100 text-gray-800 rounded-xl shadow-md hover:bg-gray-200 transition">
                  <Icon className="w-7 h-7" />
                </div>
                {index % 2 !== 0 ? (
                  <div className="w-1/2 pl-6 text-gray-800 font-medium">
                    {feature.title}
                  </div>
                ) : (
                  <div className="w-1/2"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserFriendly;
