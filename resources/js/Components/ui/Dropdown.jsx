import {
    faArrowRightFromBracket,
    faEllipsisVertical,
    faGear,
    faMessage,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LiquidGlass from "liquid-glass-react";
import { useEffect, useRef, useState } from "react";

export default function Dropdown() {
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

            {open && (
                <div className="relative top-10 right-25 z-50">
                    <LiquidGlass
                        displacementScale={60}
                        blurAmount={0.50}
                        saturation={140}
                        aberrationIntensity={50}
                        elasticity={0.4}
                        cornerRadius={16}
                        padding="0px 0px"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                        }}
                        className="bg-white/10 rounded-2xl backdrop-blur-md "
                    >
                        <div className="w-40 ">
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
                                    <FontAwesomeIcon
                                        icon={faArrowRightFromBracket}
                                        className="w-4 h-4 mr-3"
                                    />
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </LiquidGlass>
                </div>
            )}
        </div>
    );
}
