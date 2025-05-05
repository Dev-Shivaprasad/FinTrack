import { useNavigate } from "react-router";
import { cn } from "./utils/utils";
import { AnimatePresence, motion } from "motion/react";

type Buttonprops = {
  title: string;
  bgcolor?: boolean;
  link?: string;
  className?: string;
  action?: () => void;
  disabled?: boolean;
  attributes?: any;
};

export default function Button({
  title = "name here",
  className,
  bgcolor = true,
  action,
  link,
  disabled,
  attributes,
}: Buttonprops) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <motion.button
        {...attributes}
        disabled={disabled}
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
          " rounded-sm p-1 border border-primary/20 hover:border-primary/60 w-fit cursor-pointer disabled:opacity-50 text-sm",
          "md:text-lg md:p-2 md:rounded-md",

          className
        )}
      >
        {title}
      </motion.button>
    </AnimatePresence>
  );
}
