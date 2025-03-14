import { Link } from "react-router";
import { cn } from "./utils/utils";
import { motion } from "motion/react";

type Buttonprops = {
  title: string;
  bgcolor?: boolean;
  link?: string;
  className?: string;
  action?: () => void;
};

export default function Button({
  title = "name here",
  className,
  bgcolor = true,
  action,
}: Buttonprops) {
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      exit={{ scale: 1 }}
      onClick={action}
      className={cn(
        bgcolor ? "bg-secondary" : "bg-transparent border border-accent",
        " rounded-lg p-2 w-full cursor-pointer",
        className
      )}
    >
      {title}
    </motion.button>
  );
}
