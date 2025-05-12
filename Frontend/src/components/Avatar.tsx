import { AnimatePresence, motion } from "motion/react";
import {
  Dispatch,
  JSX,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "./utils/utils";
import { User } from "lucide-react";
import Goto from "./utils/GOTO";
import axios from "axios";
import { BaseURL, Users } from "./utils/DBLinks";
import { CurrentSelectedTab, GetUserDetails } from "./utils/DbSchema";
import toast from "react-hot-toast";

async function deleteuser() {
  await axios
    .delete(BaseURL + Users.Delete + GetUserDetails().user_id, {
      headers: {
        Authorization: `bearer ${GetUserDetails().jwt_token}`,
        "Content-Type": "application/json",
      },
    })
    .then((_) => Goto({ Link: "/" }))
    .catch((err) => console.log(err));
}

const navitems = [
  {
    title: "Home",
    Action: () => {
      Goto({ Link: "/" });
    },
    textcolor: "",
  },
  {
    title: "Logout",
    Action: () => {
      CurrentSelectedTab("Home"),
        localStorage.removeItem("JwtToken"),
        localStorage.removeItem("Airesult"),
        Goto({ Link: "/" });
    },
    textcolor: "",
  },
  {
    title: "DashBoard",
    Action: () => {
      Goto({ Link: "/dashboard" });
    },
    textcolor: "",
  },
  {
    title: "DeleteUser",

    Action: async () => {
      toast.custom(
        (t) => (
          <AnimatePresence>
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              className="bg-text p-3 rounded-lg shadow-lg"
            >
              <div className="text-center">
                <p className="text-red-400">
                  Are you sure you want to delete your Account?
                </p>
                <p className="text-red-700">
                  all Your data Will be erased and cannot be reverted back
                </p>
              </div>
              <div className="mt-2 flex justify-around">
                <button
                  className="bg-primary hover:bg-secondary text-text font-bold py-1 px-2 rounded-xl mr-2  cursor-pointer"
                  onClick={() => {
                    toast.dismiss();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-xl cursor-pointer"
                  onClick={() => {
                    deleteuser();
                    toast.success("Item deleted successfully!");
                    toast.dismiss(t.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        ),
        {
          id: "confirm-delete",
          position: "top-center",
          duration: 99999,
        }
      );
    },
    textcolor: "red",
  },
];

export default function Avatar(props: {
  ClassName?: string;
  Icon?: JSX.Element | string;
}) {
  return <AvatarDropdown ClassName={props.ClassName} Icon={props.Icon} />;
}

const AvatarDropdown = (props: {
  ClassName?: string;
  Icon?: JSX.Element | string;
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
          className="flex items-center gap-2 rounded-md transition-colors "
        >
          <span className="flex flex-col items-center justify-center cursor-pointer text-2xl p-2 text-accent h-10 w-h-10 font-Heading rounded-lg  bg-text">
            {props.Icon ? props.Icon : <User />}
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
              textcolor={item.textcolor}
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
  textcolor,
  setOpen,
  className,
  onClick,
}: {
  title: string;
  textcolor?: string;
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
      <div
        className={cn(
          "flex justify-center items-center gap-2",
          textcolor ? `text-${textcolor}-600` : ""
        )}
      >
        {title}
      </div>
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
