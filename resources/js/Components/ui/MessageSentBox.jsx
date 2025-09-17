import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    faFaceSmile,
    faPaperclip,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "../hook/useClickOutside";

export default function MessageSentBox() {
    const [message, setMessage] = useState("");
    const [emojiData, setEmojiData] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const emojiWrapper = useRef(null);
    useClickOutside(emojiWrapper, () => setShowPicker(false));

    useEffect(() => {
        async function loadEmojiData() {
            try {
                const res = await fetch(
                    "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
                );
                const data = await res.json();
                setEmojiData(data);
            } catch (err) {
                console.error("Failed to load emoji data:", err);
            }
        }

        loadEmojiData();
    }, []);

    const addEmoji = (emoji) => {
        setMessage(message + emoji.native);
    };
    return (
        <>
            <form className=" mt-2">
                <div className="bg-white/10 rounded-full w-full flex items-center gap-1 h-11">
                    <span className="flex gap-1 h-full relative" ref={emojiWrapper}>
                        <button
                            
                            className="text-xl h-full aspect-square p-1  rounded-full text-white bg-glass hover:bg-white/20 hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out cursor-pointer"
                            type="button"
                            onClick={() => setShowPicker(!showPicker)}
                        >
                            <FontAwesomeIcon
                                icon={faFaceSmile}
                                className="text-white"
                            />
                        </button>
                        
                            <motion.span
                                // ref={emojiWrapper}
                                initial={false}
                                animate={
                                    showPicker
                                        ? {
                                              opacity: 1,
                                              scale: 1,
                                              pointerEvents: "auto",
                                          }
                                        : {
                                              opacity: 0,
                                              scale: 0.1,
                                              pointerEvents: "none",
                                          }
                                }
                                transition={{
                                    scale: {
                                        type: "spring",
                                        damping: 7,
                                        mass: 0.4,
                                        stiffness: 80,
                                        bounce: 1,
                                    },
                                    opacity: {
                                        duration: 0.3,
                                        ease: "easeInOut",
                                    },
                                }}
                                className="absolute bottom-15 left-0 -translate-x-48 w-96 z-50 origin-bottom"
                            >
                                <Picker
                                    data={emojiData}
                                    set="apple"
                                    onEmojiSelect={addEmoji}
                                    navPosition="bottom"
                                    previewPosition="none"
                                    perLine={11}
                                    emojiButtonSize={42}
                                    emojiButtonRadius={"12px"}
                                    emojiButtonColors={["rgba(255,255,255,.1)"]}
                                    emojiSize={28}
                                    emojiVersion={14}
                                    exceptEmojis={["flag-il"]}
                                    icons={"outline"}
                                    maxFrequentRows={2}
                                    // onClickOutside={() => setShowPicker(!showPicker)}
                                />
                            </motion.span>
                        <div>
                            <button
                                className="text-xl h-full aspect-square p-1 rounded-full text-white bg-glass hover:bg-white/20 hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out cursor-pointer"
                                type="button"
                            >
                                <FontAwesomeIcon
                                    icon={faPaperclip}
                                    className="text-white"
                                />
                            </button>
                        </div>
                    </span>
                    <input
                        type="text"
                        className=" w-full bg-transparent backdrop-blur-md shadow-md h-full outline-none text-white px-4 py-2 text-base rounded-full border border-transparent focus:border-amber-50 transition-all"
                        placeholder="Type a Message Here..."
                        autoComplete="off"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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
        </>
    );
}
