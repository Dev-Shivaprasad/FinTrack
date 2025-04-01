import { motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { cn } from "./utils/utils";
import { User } from "lucide-react";
import Goto from "./utils/GOTO";

const navitems = [
  {
    title: "Home",
    Action: () => {
      Goto({ Link: "/" });
    },
  },
  {
    title: "Logout",
    Action: () => {
      localStorage.removeItem("JwtToken"), Goto({ Link: "/" });
    },
  },
  {
    title: "DashBoard",
    Action: () => {
      Goto({ Link: "/dashboard" });
    },
  },
];

export default function Avatar(props: { ClassName?: string }) {
  return <AvatarDropdown ClassName={props.ClassName} />;
}

const AvatarDropdown = (props: { ClassName?: string }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside clicks/taps
  useEffect(() => {
    const handleOutsideInteraction = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction);

    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("touchstart", handleOutsideInteraction);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={cn(
        " flex items-center w-fit justify-center rounded-xl text-xs md:text-sm",
        props.ClassName
      )}
    >
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => {
            setOpen((pv) => !pv);
          }}
          className="flex items-center gap-2 rounded-md transition-colors "
        >
          <span className="cursor-pointer text-2xl p-2 rounded-full bg-text">
            <User className="text-accent" />
          </span>
          {/* <motion.span variants={iconVariants} className="cursor-pointer">
            <FiChevronDown />
          </motion.span> */}
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-1 p-3 rounded-lg bg-secondary shadow-xl absolute top-[120%] left-[50%] w-fit overflow-hidden"
        >
          {navitems.map((item, index) => (
            <Option
              setOpen={setOpen}
              key={index}
              title={item.title}
              onClick={item.Action}
            />
          ))}
          {/* <AnimatePresence>
            <motion.span
              variants={wrapperVariants}
              className="italic flex text-xs items-center justify-center text-Accent bg-Background w-fit p-1 px-2 rounded-md
              "
            >
              <span className="font-bold text-sm text-Primary">*</span>
              Personal Favorite
            </motion.span>
          </AnimatePresence> */}
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({
  title,
  setOpen,
  className,
  onClick,
}: {
  title: string;
  link?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.button
      variants={itemVariants}
      onClick={() => {
        setOpen(false);
        if (onClick) onClick();
      }}
      className={cn(
        "flex items-center justify-between gap-2 w-full p-2 font-medium whitespace-nowrap rounded-md hover:bg-secondary/70 hover:text-center text-text hover:text-primary transition-colors cursor-pointer",
        className
      )}
    >
      <div className="flex justify-center items-center gap-2">{title}</div>
    </motion.button>
  );
};

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
    },
  },
};

// const iconVariants = {
//   open: { rotate: 180 },
//   closed: { rotate: 0 },
// };

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};
