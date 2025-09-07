import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Messages } from "../Data/messages";
import { faPaperclip, faPaperPlane, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import VerifyBadge from "@/Components/ui/VerifyBadge";
import IncomingChat from "../Components/IncomingChat";
import OutgoingChat from "../Components/OutgoingChat";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
    const [open, setOpen] = useState(false);
    const detailDropDwn = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                detailDropDwn.current &&
                !detailDropDwn.current.contains(event.target)
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
        <div className="flex-1 h-[85dvh] select-none">
            <div className="w-full h-full flex flex-col">
                <section className="flex flex-col w-full h-full px-2 py-1 ">
                    <header className="relative text-white flex items-center gap-4 sharp-border w-full border-b-amber-50 pb-1 radial-gradient mb-2" ref={detailDropDwn} >
                        <div className="w-12 h-12 rounded-full outline-[3px] outline-green-700 outline-offset-4 overflow-hidden">
                            <img
                                src="/assets/images/img-3.jpeg"
                                alt="User-Img"
                                className="w-full h-full"
                            />
                        </div>
                        <span
                            onClick={() => 
                                setOpen(!open)
                            }
                            className="w-3/4"
                        >
                            <div className="flex items-center gap-2">
                                <h3 className="text-md">Hamza Aamir</h3>
                                <div className="relative w-4.5 h-4.5 ">
                                    <VerifyBadge />
                                </div>
                                <div className="bg-glass text-gray-200 px-1.5 py-0.5 rounded-xl inline-flex items-center gap-1">
                                    <span className="text-xs ">🔥 7500</span>
                                </div>
                            </div>
                            <p className="text-xs text-green-500">Online</p>
                        </span>
                        {/* Drop Down */}

                        <motion.div
                            ref={detailDropDwn}
                            initial={{ opacity: 0, y: -290 }}
                            animate={
                                open
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: -290 }
                            }
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                mass: 0.7,
                                damping: 10,
                                bounce: 0.2,
                            }}
                            className="w-80 absolute top-1 left-5 rounded-lg px-3 py-4 bg-gray-900 shadow-lg z-50 "
                        >
                            <div className="w-full flex justify-center items-center flex-col py-3 gap-2">
                                <div className="w-20 h-20 rounded-full overflow-hidden">
                                    <img
                                        src="/assets/images/img-3.jpeg"
                                        alt="User-img-sub"
                                        className="w-full h-full"
                                    />
                                </div>
                                <span className="text-center">
                                    <h4>Hamza Aamir</h4>
                                    <small className="text-gray-400">
                                        x-hamza
                                    </small>
                                </span>
                                <button className="bg-blue-400 px-3 py-1 rounded-full">
                                    Block
                                </button>
                            </div>
                        </motion.div>
                        <div>
                            <FontAwesomeIcon icon={faSearch}/> 
                        </div>
                    </header>

                    <div className="chat-bx px-3 py-3 flex flex-col w-full gap-1 overflow-y-auto flex-1 select-text">
                        {/* Incoming Chat */}

                        {Messages.map((msg, i) => (
                            <IncomingChat msg={msg} index={i} key={i} />
                        ))}

                        <div className="w-full text-center my-5">
                            <span className="px-5 py-2 bg-glass rounded-full text-white text-sm">
                                new messages
                            </span>
                        </div>

                        {/* Outgoing chat */}
                        <OutgoingChat />
                    </div>

                    <form className=" mt-2">
                        <div className="bg-white/10 rounded-full w-full flex items-center gap-1 h-11">
                            <span className="flex gap-1 h-full">
                                <button
                                    className="text-xl h-full aspect-square p-1  rounded-full text-white bg-glass hover:bg-white/20 hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out cursor-pointer"
                                    type="button"
                                >
                                    <FontAwesomeIcon
                                        icon={faFaceSmile}
                                        className="text-white"
                                    />
                                </button>
                                <button
                                    className="text-xl h-full aspect-square p-1 rounded-full text-white bg-glass hover:bg-white/20 hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out cursor-pointer"
                                    type="button"
                                >
                                    <FontAwesomeIcon
                                        icon={faPaperclip}
                                        className="text-white"
                                    />
                                </button>
                            </span>
                            <input
                                type="text"
                                className=" w-full bg-transparent backdrop-blur-md shadow-md h-full outline-none text-white px-4 py-2 text-base rounded-full border-2 border-transparent focus:border-amber-50 transition-all"
                                placeholder="Type a Message Here..."
                                autoComplete="off"
                            />
                            <button
                                className="text-xl h-full aspect-square  rounded-full text-white bg-glass hover:bg-white/20 hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out cursor-pointer"
                                type="button"
                            >
                                <FontAwesomeIcon
                                    icon={faPaperPlane}
                                    className="rotate-45"
                                />
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}
