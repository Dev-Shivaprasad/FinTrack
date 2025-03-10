import { FiChevronDown } from "react-icons/fi";
import { motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { cn } from "./utils/utils";

let Colorarray: string[] = [
  "dark",
  "light",
  "orange_light",
  "brown_dark",
  "brown_light",
  "cyan_dark",
];

const navitems = [
  {
    color: "oklch(84.11% 0.075 155.29)",
    ColorHtmlValue: "light",
    Colorname: "Light",
  },
  {
    color: "oklch(42.42% 0.083 152.14)",
    ColorHtmlValue: "dark",
    Colorname: "Dark",
  },
  {
    color: "rgb(191, 242, 120)",
    ColorHtmlValue: "orange_light",
    Colorname: "Orange Light  *",
  },
  {
    color: "rgb(120, 48, 65)",
    ColorHtmlValue: "brown_dark",
    Colorname: "Brown dark",
  },
  {
    color: "rgb(207, 135, 152)",
    ColorHtmlValue: "brown_light",
    Colorname: "Brown Light  *",
  },
  {
    color: "rgb(35, 123, 117)",
    ColorHtmlValue: "cyan_dark",
    Colorname: "Cyan dark",
  },
];

export default function Theme(props: { ClassName?: string }) {
  // Initialize theme from localStorage or fallback to "dark"
  const [Theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    // Sync theme with localStorage
    localStorage.setItem("theme", Theme);

    // Apply theme class to the HTML element
    const root = document.querySelector("html");
    root?.classList.remove(...Colorarray);
    root?.classList.add(Theme);
  }, [Theme]);

  return <Themedropdown setTheme={setTheme} ClassName={props.ClassName} />;
}

const Themedropdown = (props: {
  setTheme: Dispatch<SetStateAction<string>>;
  ClassName?: string;
}) => {
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
          className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors "
        >
          <span className="cursor-pointer">Themes</span>
          <motion.span variants={iconVariants} className="cursor-pointer">
            <FiChevronDown />
          </motion.span>
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
              color={item.color}
              ColorHtmlValue={item.ColorHtmlValue}
              Colorname={item.Colorname}
              key={index}
              setTheme={props.setTheme}
              className={
                localStorage.getItem("theme") == item.ColorHtmlValue
                  ? "bg-text/40 border border-secondary border-dashed cursor-pointer"
                  : ""
              }
            />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({
  color,
  ColorHtmlValue,
  Colorname,
  setOpen,
  setTheme,
  className,
  onClick,
}: {
  color: string;
  Colorname: string;
  ColorHtmlValue: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTheme: Dispatch<SetStateAction<string>>;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.button
      variants={itemVariants}
      onClick={() => {
        setOpen(false);
        setTheme(ColorHtmlValue);
      }}
      onClickCapture={() => {
        onClick;
      }}
      className={cn(
        "flex items-center justify-between gap-2 w-full p-2 font-medium whitespace-nowrap rounded-md hover:bg-secondary/70 hover:text-center text-text hover:text-primary transition-colors cursor-pointer",
        className
      )}
    >
      <div className="flex justify-center items-center gap-2">{Colorname}</div>
      <div
        className="h-[20px] w-[20px] rounded-full bg-Background inline-block border border-text/50 border-dashed"
        style={{ backgroundColor: color }}
      />
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

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

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
