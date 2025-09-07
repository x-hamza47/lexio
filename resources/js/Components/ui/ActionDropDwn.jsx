import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

export default function ActionDropDwn({show, className = ""}) {

    const variants = {
        rest: {
            width: 20,
            opacity: 0,
            transition: {
                width: {
                    type: "spring",
                    stiffness: 100,
                    damping: 4,
                    mass: 0.9,
                    bounce: 0.25,
                },
                opacity: {
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.7, 
                },
            },
        },
        hover: {
            width: 44,
            opacity: 1,
            transition: {
                width: {
                    type: "spring",
                    stiffness: 100,
                    damping: 4,
                    mass: 0.9,
                    bounce: 0.25,
                },
                opacity: {
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0, 
                },
            },
        },
    };


    return (
        <div className=" text-gray-300 h-6">
            <motion.button
                initial="rest"
                whileHover="hover"
                variants={variants}
                animate={show ? "hover" : "rest"}
                className={`bg-glass bg-black/20 flex items-center justify-between 
                   rounded-full px-1 py-1 overflow-hidden gap-2 ${className}`}
            >
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-[10px] w-full h-full"
                />
                <FontAwesomeIcon
                    icon={faSmile}
                    className="text-sm opacity-0 group-hover:opacity-100 delay-100 transition-all"
                />
            </motion.button>
  
        </div>
    );
}
