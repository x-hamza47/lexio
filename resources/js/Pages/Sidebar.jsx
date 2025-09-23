import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars,faGear,faUser} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import useClickOutside from "@/Components/hook/useClickOutside";
import { faComment, faCommentDots } from "@fortawesome/free-regular-svg-icons";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
      const sidebarRef = useRef(null);

      // Close sidebar when clicking outside
      useClickOutside(sidebarRef, () => setIsOpen(false));

    return (
        <div
            className={`h-full w-14 z-50  transition-all duration-200`}
            ref={sidebarRef}
        >
            <div
                className="bg-black/5  backdrop-blur-md border border-y h-full  border-white/20  transition-all duration-300 rounded-l-2xl  
                 "
            >
                <div
                    className={`fixed top-0 left-0 h-full  backdrop-blur-md shadow-lg border-l border-white/20 transition-all duration-300  rounded-l-xl overflow-hidden   flex flex-col items-start z-50 ${
                        isOpen ? "w-52 bg-black/90" : "w-14 bg-transparent"
                    }`}
                >
                    <div className="w-[inherit] py-4  flex items-start flex-col">
                        {/* Toggle button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="mb-4 text-white/70 hover:text-white ml-4 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>

                        {/* Menu Items */}
                        <div className={`w-full px-1.5 py-2 cursor-pointer transition-colors d-center text-white/80 `}>
                            <div className="w-full flex items-center rounded-md transition-all duration-100 hover:bg-white/20 hover:text-white px-3 py-2">
                                <FontAwesomeIcon
                                    icon={faComment}
                                    className="text-lg"
                                />
                                <span
                                    className={`overflow-hidden whitespace-nowrap transition-all duration-300 ml-5  ${
                                        isOpen ? "opacity-100  " : "opacity-0 "
                                    }`}
                                >
                                    Chats
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
