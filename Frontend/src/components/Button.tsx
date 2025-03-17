import { useNavigate } from "react-router";
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
  link,
}: Buttonprops) {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      exit={{ scale: 1 }}
      onClick={() => {
        if (action) action();
        if (link) navigate(link);
      }}
      className={cn(
        bgcolor ? "bg-secondary" : "bg-transparent border border-accent",
        " rounded-lg p-2 w-fit cursor-pointer",
        className
      )}
    >
      {title}
    </motion.button>
  );
}
