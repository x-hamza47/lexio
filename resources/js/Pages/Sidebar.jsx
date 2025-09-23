import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import useClickOutside from "@/Components/hook/useClickOutside";
import { faComment } from "@fortawesome/free-regular-svg-icons";

export default function Sidebar({activeTab, onFetch, onTabChange}) {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    useClickOutside(sidebarRef, () => setIsOpen(false));

    return (
        <div
            className={`h-full w-14 z-50  transition-all duration-200 lg:block hidden`}
            ref={sidebarRef}
        >
            <div className="bg-black/5  backdrop-blur-md border border-y h-full  border-white/20  transition-all duration-300 rounded-l-2xl">
                <div
                    className={`fixed top-0 left-0 h-full  backdrop-blur-md shadow-lg border-l border-white/20 transition-all duration-300  rounded-l-2xl overflow-hidden   flex flex-col items-start z-50 ${
                        isOpen ? "w-52 bg-black/90" : "w-14 bg-transparent"
                    }`}
                >
                    <ul className="w-full py-4 h-full flex items-start flex-col justify-between">
                        <div className="w-full">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="mb-4 text-white/70 hover:text-white ml-4 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </button>

                            <li
                                className={`w-full px-1.5 py-2 cursor-pointer transition-colors d-center`}
                                onClick={() => onTabChange("chats")}
                            >
                                <span
                                    className={`flex items-center w-full gap-4 px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/10 hover:text-white text-white/80 ${
                                        activeTab === "chats"
                                            ? "text-white bg-white/20"
                                            : "text-white/50"
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={faComment}
                                        className="text-lg "
                                    />
                                    <span
                                        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ml-5 ${
                                            isOpen
                                                ? "opacity-100  "
                                                : "opacity-0 "
                                        }`}
                                    >
                                        Chats
                                    </span>
                                </span>
                            </li>
                            <li
                                className={`w-full px-1.5 py-2 cursor-pointer transition-colors d-center text-white/50 `}
                                onClick={() => onTabChange("addFriends")}
                            >
                                <span
                                    className={`flex items-center w-full gap-4 px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/10 hover:text-white text-white/80 ${
                                        activeTab === "addFriends"
                                            ? "text-white bg-white/20"
                                            : "text-white/50"
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={faUserPlus}
                                        className="text-lg "
                                    />
                                    <span
                                        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ml-5 ${
                                            isOpen
                                                ? "opacity-100  "
                                                : "opacity-0 "
                                        }`}
                                    >
                                        Add Friend
                                    </span>
                                </span>
                            </li>
                        </div>
                        <div className="w-full ">
                            <li
                                className={`w-full px-1.5 py-2 cursor-pointer transition-colors d-center text-white/50 `}
                            >
                                <span
                                    className={`flex items-center w-full gap-4 px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/10 hover:text-white text-white/80 ${
                                        activeTab === "settings"
                                            ? "text-white bg-white/20"
                                            : "text-white/50"
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={faGear}
                                        className="text-lg "
                                    />
                                    <span
                                        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ml-5 ${
                                            isOpen
                                                ? "opacity-100  "
                                                : "opacity-0 "
                                        }`}
                                    >
                                        Settings
                                    </span>
                                </span>
                            </li>
                            <li
                                className={`w-full px-1.5 py-2 cursor-pointer transition-colors d-center text-white/50 `}
                            >
                                <span
                                    className={`w-full gap-3 flex items-center rounded-md transition-all duration-100 hover:bg-white/20 hover:text-white px-1.5 py-2 ${
                                        activeTab === "profile"
                                            ? "text-white bg-white/20"
                                            : "text-white/50"
                                    }`}
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                                        <img
                                            src="/assets/images/img-1.jpeg"
                                            alt="profile_pic"
                                            className="w-full h-full object-cover "
                                        />
                                    </div>
                                    <span
                                        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ml-5 ${
                                            isOpen
                                                ? "opacity-100  w-auto"
                                                : "opacity-0 w-0"
                                        }`}
                                    >
                                        Profile
                                    </span>
                                </span>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}
