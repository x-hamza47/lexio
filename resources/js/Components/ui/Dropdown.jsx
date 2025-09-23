import {
    faArrowRightFromBracket,
    faEllipsisVertical,
    faGear,
    faMessage,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import { Link } from "@inertiajs/react";

import { router } from "@inertiajs/react";


export default function Dropdown() {
    
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true);
        router.post(
            "/logout",
            {},
            {
                onSuccess: () => {
                    router.replace("/"); 
                },
            }
        );
    };


    // ! Toggle State
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
       
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="d-center w-8 h-8 rounded-full text-white bg-glass hover:bg-white/20 hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <FontAwesomeIcon
                    icon={open ? faXmark : faEllipsisVertical}
                    className="text-md p-2 rounded-full"
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.1 }}
                        transition={{
                            scale: {
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            },
                            opacity: {
                                duration: 0.3,
                                ease: "easeInOut",
                            },
                        }}
                        className="w-40 bg-glass rounded-2xl absolute top-0 right-10 z-50 origin-top-right"
                    >
                        <ul className="px-2 py-1 text-sm text-white/60 ">
                            <li className="px-2 py-3 hover:text-white transition ease-in sharp-border cursor-pointer flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faMessage}
                                    className="w-4 h-4 mr-3"
                                />
                                New Chat
                            </li>
                            <li className="px-2 py-3 hover:text-white transition ease-in sharp-border cursor-pointer flex items-center gap-2 ">
                                <FontAwesomeIcon
                                    icon={faGear}
                                    className="w-4 h-4 mr-3"
                                />
                                Settings
                            </li>
                            <li className="px-2 py-3 hover:text-white transition ease-in sharp-border cursor-pointer flex items-center gap-2">
                                <button
                                    onClick={handleLogout}
                                    disabled={loading}
                                    className="flex items-center gap-5 disabled:opacity-50 disabled:cursor-progress w-full cursor-pointer"
                                >
                                    {loading ? (
                                        <span className="animate-spin border-2 border-white/50 border-t-transparent rounded-full w-4 h-4"></span>
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faArrowRightFromBracket}
                                            className="w-4 h-4"
                                        />
                                    )}
                                    {loading ? "Logging out..." : "Logout"}
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
